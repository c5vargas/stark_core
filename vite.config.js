import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path'
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/main.tsx'],
            refresh: true,
            postcss: [
                tailwindcss(),
                autoprefixer(),
            ],
        }),
        react(),
    ],
    build: {
        chunkSizeWarningLimit: 1800,
        target: 'esnext'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    optimizeDeps: {
        include: [],
    },
});