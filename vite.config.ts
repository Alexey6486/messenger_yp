import { defineConfig } from 'vite';
import path from 'path';
// import react from '@vitejs/plugin-react'; // For React projects

export default defineConfig({
    plugins: [],

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
                require('postcss-preset-env')({}),
                // require('autoprefixer'),
                // Only minify in production
                // ...(process.env.NODE_ENV === 'production'
                //     ? [require('cssnano')({preset: 'default'})]
                //     : []),
            ],
        },
    },

    // build: {
    //     sourcemap: true,
    //     rollupOptions: {
    //         output: {
    //             // Useful for library builds
    //             globals: {
    //                 react: 'React',
    //                 'react-dom': 'ReactDOM',
    //             },
    //         },
    //     },
    // },

    server: {
        port: 3000,
        open: true,
        // proxy: {
        //     Example API proxy
        //     '/api': 'http://localhost:5000',
        // },
    },

    // test: {
    //     globals: true,
    //     environment: 'jsdom',
    //     setupFiles: './tests/setup.ts',
    // },
});

// export default {
//     css: {
//         postcss: './postcss.config.js'
//     }
// }
