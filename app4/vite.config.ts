import { defineConfig } from 'vite'

export default defineConfig({
  base: "./",
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
      interval: 1000,
    }
  },
})