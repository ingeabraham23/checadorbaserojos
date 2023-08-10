import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "background_color": "#ffffff",
        "categories": ["transporte", "trabajo"],
        "description": "Esta es una PWA para Checador de tranporte publico que se encuentra en la base",
        "dir": "ltr",
        "display_override": ["standalone", "fullscreen"],
        "display": "standalone",
        "icons": [
          { "src": "pwa-64x64.png", "sizes": "64x64", "type": "image/png", "purpose": "any"},
          { "src": "pwa-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
          { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
          { "src": "maskable-icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" },
        ],
        "lang":"es-MX",
        "name": "PWA Checador base urbanos rojos",
        "orientation": "portrait",
        "prefer_related_application":false,
        "short_name": "PWA Rojos",
        "start_url": "/checadorbaserojos/",
        "theme_color":"orange"
      },
    },
    

    ),
  ],
  base: "/checadorbaserojos/",
  server: {
    host: true,
  },
});
