import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        nodePolyfills({
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    build: {
        // The 3D scenes are lazy-loaded, so three.js lands in its own on-demand chunk.
        chunkSizeWarningLimit: 1100,
    },
})
