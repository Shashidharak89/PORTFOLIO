import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true, // Ensures React Router works on refresh
  },
  resolve: {
    alias: {
      'three': 'three'
    }
  }
})



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         port: 5173,
//         open: true,
//         historyApiFallback: true, // Ensures React Router works on refresh
//     },
// });
