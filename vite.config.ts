import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      base: "/",
      manifest: {
        name: "Ordle",
        short_name: "Ordle",
        theme_color: "#000",
        icons: [
          {
            src: "/logo-64.png",
            sizes: "64x64 32x32",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/logo-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any",
          },
          {
            src: "/logo-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any",
          },
        ],
        start_url: ".",
      },

      devOptions: { enabled: true, navigateFallback: "index.html" },
      workbox: {
        cacheId: "ordle",
        runtimeCaching: [
          {
            urlPattern: /\.(?:json|svg|png|css)$/i,
            handler: "StaleWhileRevalidate",
          },
        ],
      },
    }),
  ],
  base: "/",
});
