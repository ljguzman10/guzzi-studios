import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serverless-safe fallback token verification helpers
const TOKEN_DIR = path.join('/tmp', '.guzzi_auth');
if (!fs.existsSync(TOKEN_DIR)) {
  try { fs.mkdirSync(TOKEN_DIR, { recursive: true }); } catch (e) {}
}

function persistToken(token) {
  try {
    fs.writeFileSync(path.join(TOKEN_DIR, token), Date.now().toString());
  } catch (e) {
    console.error("Token persistence tracking error:", e);
  }
}

function checkPersistedToken(token) {
  if (!token) return false;
  const cleanToken = token.replace(/[^a-zA-Z0-9_\-]/g, '');
  const tokenPath = path.join(TOKEN_DIR, cleanToken);
  if (fs.existsSync(tokenPath)) {
    try {
      const timestamp = parseInt(fs.readFileSync(tokenPath, 'utf8'), 10);
      if (Date.now() - timestamp < 4 * 60 * 60 * 1000) {
        return true;
      }
      fs.unlinkSync(tokenPath);
    } catch (e) {}
  }
  return false;
}

function removePersistedToken(token) {
  if (!token) return;
  try {
    const cleanToken = token.replace(/[^a-zA-Z0-9_\-]/g, '');
    const tokenPath = path.join(TOKEN_DIR, cleanToken);
    if (fs.existsSync(tokenPath)) fs.unlinkSync(tokenPath);
  } catch (e) {}
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Trust reverse proxy for HTTPS cookie delivery
  app.set('trust proxy', 1);

  const ADMIN_USER = process.env.ADMIN_USER || "luisg";
  const ADMIN_PASS = process.env.ADMIN_PASS || "guzzistu773";
  const SESSION_SECRET = process.env.SESSION_SECRET || "guzzi-studios-secure-session-secret-key-2026";

  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 4 * 60 * 60 * 1000
    }
  }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  function requireAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) {
      return next();
    }

    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const tokenFromXHeader = req.headers['x-admin-token'];
    const tokenFromQuery = req.query.token;

    const token = tokenFromHeader || tokenFromXHeader || tokenFromQuery;

    if (token && checkPersistedToken(token)) {
      if (req.session) {
        req.session.isAdmin = true;
      }
      return next();
    }
    
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: "Unauthorized: Administrator privileges required." });
    }
    
    res.redirect('/login');
  }

 // --- AUTHENTICATION ROUTES ---
  app.get('/login', (req, res) => {
    // Look in the root directory where the server file is
    const loginPath = path.join(__dirname, 'login.html');
    
    // Check if it exists, otherwise check a common Vercel alternative path
    if (fs.existsSync(loginPath)) {
      return res.sendFile(loginPath);
    } else {
      // Fallback: check one level up (common in Vercel builds)
      return res.sendFile(path.join(process.cwd(), 'login.html'));
    }
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = "guzzi_token_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
      persistToken(token);

      if (req.session) {
        req.session.isAdmin = true;
      }

      const isJson = req.headers['content-type'] === 'application/json' || req.accepts('json');
      if (isJson && !req.headers['content-type']?.includes('form')) {
        return res.json({ success: true, token });
      }

      res.redirect(`/?admin=true&token=${token}`);
    } else {
      const isJson = req.headers['content-type'] === 'application/json' || req.accepts('json');
      if (isJson && !req.headers['content-type']?.includes('form')) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.redirect('/login?error=1');
    }
  });

  app.get('/logout', (req, res) => {
    const token = req.query.token || req.headers['x-admin-token'];
    if (token) {
      removePersistedToken(token);
    }
    req.session.destroy(() => {
      res.redirect('/');
    });
  });

  app.get('/api/admin/session', (req, res) => {
    if (req.session && req.session.isAdmin) {
      return res.json({ isAdmin: true });
    }

    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const tokenFromXHeader = req.headers['x-admin-token'];
    const tokenFromQuery = req.query.token;

    const token = tokenFromHeader || tokenFromXHeader || tokenFromQuery;

    if (token && checkPersistedToken(token)) {
      if (req.session) {
        req.session.isAdmin = true;
      }
      return res.json({ isAdmin: true, token });
    }

    res.json({ isAdmin: false });
  });

  app.get('/api/admin/data', requireAdmin, (req, res) => {
    res.json({
      status: "authenticated",
      administrator: ADMIN_USER,
      systemTime: new Date(),
      scopes: ["cms_write", "crm_read", "team_queue"]
    });
  });

  app.get('/admin', requireAdmin, (req, res) => {
    res.redirect('/?admin=true');
  });

  // --- STATIC ASSETS & VITE DEV SERVER MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server in middleware mode for hot reloading/frontend assets in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from dist folder
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    
    // Handle root frontend catch-all safely
    app.get('*', (req, res) => {
      if (fs.existsSync(path.join(distPath, 'index.html'))) {
        res.sendFile(path.join(distPath, 'index.html'));
      } else {
        res.status(200).send("Guzzi Studios API Node running cleanly.");
      }
    });
  }

 // Remove the old app.listen and use this instead:
  if (process.env.NODE_ENV === 'production') {
    module.exports = app;
  } else {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[GUZZI STUDIOS] Server initialized on port ${PORT}`);
    });
  }
} // This closing brace ends the startServer() function

startServer().catch((error) => {
  console.error("FATAL: Failed to initiate server bootstrapping sequence:", error);
});

startServer().catch((error) => {
  console.error("FATAL: Failed to initiate server bootstrapping sequence:", error);
});