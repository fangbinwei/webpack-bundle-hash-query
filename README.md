# webpack-bundle-hash-query

demo for [issue](https://github.com/vuejs/vue-cli/issues/5989)

support `<script src="/js/chunk-vendors.js?_hash=0d01e0b2c53c417bdcfd"></script>`

since `@intervolga/optimize-cssnano-plugin` can't handle assets with query, I modified it. [related issue](https://github.com/intervolga/optimize-cssnano-plugin/issues/8). Or replace it with [css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)

If our css/css map assets contains query,`@intervolga/optimize-cssnano-plugin` will **always emit css map** even we set `css.sourceMap: false` in vue.config.js. Secondly, it **won't minify** the emitted css assets.