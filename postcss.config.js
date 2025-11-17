module.exports = {
    parser: 'sugarss',
    map: false,
    plugins: {
        'postcss-plugin': {} || null,
        'postcss-preset-env': {} || null
    }
}

// module.exports = (ctx) => ({
//     parser: ctx.parser ? 'sugarss' : false,
//     map: ctx.env === 'development' ? ctx.map : false,
//     plugins: {
//         'postcss-import': {},
//         'postcss-nested': {},
//         cssnano: ctx.env === 'production' ? {} : false
//     }
// })
