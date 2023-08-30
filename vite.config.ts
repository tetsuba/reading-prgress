import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Reading Tracker',
                short_name: 'Reading Tracker',
                theme_color: '#ffffff',
                id: '/',
                start_url: './',
                orientation: 'any',
                scope: './',
                display: 'standalone',
                icons: [
                    {
                        src: '/book.svg',
                        sizes: '800x800',
                        type: 'image/svg+xml'
                    },
                    {
                        src: '/book-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            devOptions: {
                enabled: false
            }
        })
    ],
    // @ts-ignore
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/vitest-setup.tsx',
        exclude: [...configDefaults.exclude, 'tests/*', 'tests-examples/*.ts'],
    }
})
