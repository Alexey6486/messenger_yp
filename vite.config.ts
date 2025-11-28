import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    plugins: [
        handlebars({
            include: ['src/**/*.hbs', 'src/**/*.html'],
        }),
    ],
    resolve: {
        alias: {
            '@': '/src',
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
    },
    base: process.env.VITE_BASE || '/',
    build: {
        outDir: 'dist',
    },
});
