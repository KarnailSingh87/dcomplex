import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rooms: resolve(__dirname, 'rooms.html'),
        gym: resolve(__dirname, 'gym.html'),
        grocery: resolve(__dirname, 'grocery.html'),
        nearby: resolve(__dirname, 'nearby.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
