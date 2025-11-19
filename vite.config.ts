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

    // TypeScript-specific settings
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Common alias for src folder
        },
    },

    // css: {
    //     modules: {
    //         localsConvention: 'camelCase',
    //     },
    // },

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
        //         // require('autoprefixer'),
        //         // Only minify in production
        //         // ...(process.env.NODE_ENV === 'production'
        //         //     ? [require('cssnano')({preset: 'default'})]
        //         //     : []),
            ],
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
