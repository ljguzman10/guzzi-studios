import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import app from "./api/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const PORT = process.env.PORT || 3000;

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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GUZZI STUDIOS] Server initialized on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("FATAL: Failed to initiate server bootstrapping sequence:", error);
});
