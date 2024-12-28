import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/public", // Qui specifichi la cartella del backend
    emptyOutDir: true, // Svuota la cartella "public" prima di generare i nuovi file
  },
  server: {
    proxy: {
      "/uploads": "http://localhost:3001/uploads", // Proxy per comunicare con il backend durante lo sviluppo
    },
  },
});
