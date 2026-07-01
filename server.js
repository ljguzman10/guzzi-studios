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
      sameSite: 'lax',
      maxAge: 4 * 60 * 60 * 1000
    }
  }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Simplified Admin Check (No file system dependency)
  function requireAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) {
      return next();
    }
    
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    res.redirect('/login');
  }

  // --- AUTHENTICATION ROUTES ---
  app.get('/login', (req, res) => {
    const publicPath = path.join(__dirname, 'public', 'login.html');
    if (fs.existsSync(publicPath)) {
      return res.sendFile(publicPath);
    }
    res.sendFile(path.join(__dirname, 'login.html'));
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      req.session.isAdmin = true;
      
      const isJson = req.headers['content-type'] === 'application/json' || req.accepts('json');
      if (isJson && !req.headers['content-type']?.includes('form')) {
        return res.json({ success: true });
      }
      res.redirect('/?admin=true');
    } else {
      res.redirect('/login?error=1');
    }
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });

  app.get('/api/admin/session', (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
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
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (fs.existsSync(path.join(distPath, 'index.html'))) {
        res.sendFile(path.join(distPath, 'index.html'));
      } else {
        res.status(200).send("Guzzi Studios API Node running cleanly.");
      }
    });
  }

  return app;
}

const app = await startServer();
export default app;

// Local Development Fallback
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`[GUZZI STUDIOS] Server running on http://localhost:${PORT}`);
  });
}