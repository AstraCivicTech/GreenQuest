/* eslint-disable */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://0.0.0.0:3003",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // Log the request details
            console.log(`Proxying request to: ${req.url}`);
            proxyReq.setHeader("origin", "http://localhost:5173");
          });
        },
      },
    },
  },
});
