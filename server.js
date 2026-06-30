import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust reverse proxy for HTTPS cookie delivery
  app.set('trust proxy', 1);

  // Use environment variables or safe, secure defaults
  const ADMIN_USER = process.env.ADMIN_USER || "luisg";
  const ADMIN_PASS = process.env.ADMIN_PASS || "guzzistu773";
  const SESSION_SECRET = process.env.SESSION_SECRET || "guzzi-studios-secure-session-secret-key-2026";

  // Memory store for active admin tokens to bypass blocked cross-site session cookies in iframes
  const activeTokens = new Set();

  // 1. Session tracking middleware setup with support for cross-site iframe cookies
  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Required for sameSite: 'none'
      sameSite: 'none', // Required to persist session inside AI Studio cross-site iframe
      maxAge: 4 * 60 * 60 * 1000 // 4 hours active session window
    }
  }));

  // Parse urlencoded bodies and JSON
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // 3. requireAdmin Middleware function definition
  function requireAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) {
      return next();
    }

    // Fallback: check authorization token from header or query param (for iframes blocking cookies)
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const tokenFromXHeader = req.headers['x-admin-token'];
    const tokenFromQuery = req.query.token;

    const token = tokenFromHeader || tokenFromXHeader || tokenFromQuery;

    if (token && activeTokens.has(token)) {
      if (req.session) {
        req.session.isAdmin = true;
      }
      return next();
    }
    
    // If it is an API request, return a clear 401 Unauthorized status
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: "Unauthorized: Administrator privileges required." });
    }
    
    // Otherwise, redirect to the login.html interface
    res.redirect('/login');
  }

  // --- AUTHENTICATION ROUTES ---

  // Route to get the login.html file
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
  });

  // Login POST processing
  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Generate a session token
      const token = "guzzi_token_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
      activeTokens.add(token);

      if (req.session) {
        req.session.isAdmin = true;
      }

      // Check content negotiations or direct headers
      const isJson = req.headers['content-type'] === 'application/json' || req.accepts('json');
      if (isJson && !req.headers['content-type']?.includes('form')) {
        return res.json({ success: true, token });
      }

      // Otherwise redirect to home page with admin parameter and token so the UI triggers and stores it
      res.redirect(`/?admin=true&token=${token}`);
    } else {
      const isJson = req.headers['content-type'] === 'application/json' || req.accepts('json');
      if (isJson && !req.headers['content-type']?.includes('form')) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // Redirect back with an error indicator
      res.redirect('/login?error=1');
    }
  });

  // Logout route
  app.get('/logout', (req, res) => {
    // Clear token if passed
    const token = req.query.token || req.headers['x-admin-token'];
    if (token) {
      activeTokens.delete(token);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction failure:", err);
      }
      res.redirect('/');
    });
  });

  // Check current admin session state
  app.get('/api/admin/session', (req, res) => {
    if (req.session && req.session.isAdmin) {
      return res.json({ isAdmin: true });
    }

    // Fallback: check token
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const tokenFromXHeader = req.headers['x-admin-token'];
    const tokenFromQuery = req.query.token;

    const token = tokenFromHeader || tokenFromXHeader || tokenFromQuery;

    if (token && activeTokens.has(token)) {
      if (req.session) {
        req.session.isAdmin = true;
      }
      return res.json({ isAdmin: true, token });
    }

    res.json({ isAdmin: false });
  });

  // Secure admin-only data route (Fulfilling secure admin API constraint)
  app.get('/api/admin/data', requireAdmin, (req, res) => {
    res.json({
      status: "authenticated",
      administrator: ADMIN_USER,
      systemTime: new Date(),
      scopes: ["cms_write", "crm_read", "team_queue"]
    });
  });

  // Protected admin page route redirects to the frontend with parameter if authenticated
  app.get('/admin', requireAdmin, (req, res) => {
    res.redirect('/?admin=true');
  });

  // --- STATIC ASSETS & VITE DEVSERVER MIDDLEWARE INTERFACING ---

  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from dist folder
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    
    // Fallback index.html router for SPA views
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GUZZI STUDIOS] Secure server initialized on port ${PORT}`);
    if (process.env.NODE_ENV !== "production") {
      console.log(`[VITE] Mounting Hot Module devserver proxy`);
    }
  });
}

startServer().catch((error) => {
  console.error("FATAL: Failed to initiate server bootstrapping sequence:", error);
});
