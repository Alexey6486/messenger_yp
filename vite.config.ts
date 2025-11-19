import { defineConfig } from 'vite';
import * as path from 'path';
import handlebars from 'vite-plugin-handlebars';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
    plugins: [
        handlebars({
            include: ['src/**/*.hbs', 'src/**/*.html'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv({
                    autoprefixer: {
                        grid: true,
                    },
                    features: {
                        'nesting-rules': true,
                    },
                    browsers: 'last 2 versions',
                }),
            ],
        },
    },
    server: {
        port: 3000,
        open: true,
        headers: {
            'Content-Type': 'application/javascript'
        },
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        }
    },
});
