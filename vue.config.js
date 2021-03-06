const isProd = process.env.NODE_ENV === 'production'

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
  css: {
    // if you need css sourceMap, uncomment
    //  sourceMap: true,
    extract: {
      filename: 'css/[name].css?_hash=[contenthash:8]',
      chunkFilename: 'css/[name].css?_hash=[contenthash:8]'
    }
  },
  chainWebpack: (config) => {
    // Assuming your application is a single page
    // Modify the preload config for single page
    // if your app is [multi-page](https://cli.vuejs.org/config/#pages), this preload config is invalid, we may need more complex config
    config.plugin('preload').tap(args => {
      // CLI configure fileBlackList as  [/\.map$/, /hot-update\.js$/]
      // sine we append hash to .map, so we also need filter it
      args[0].fileBlacklist.push(/\.map\?/)
      return args
    })
    if (isProd) {
      config
        .output
        .filename('js/[name].js?_hash=[contenthash:8]')
        .chunkFilename('js/[name].js?_hash=[contenthash:8]')

      // replace @intervolga/optimize-cssnano-plugin which set by CLI with my own modified version
      config.plugin('optimize-css').set('plugin', require('./@fangbinwei/optimize-cssnano-plugin'))
      // or use css-minimizer-webpack-plugin, it's better
      // config
      //   .plugin('optimize-css')
      //   .set('plugin', require('css-minimizer-webpack-plugin'))
      //   .tap(args => {
      //     const newArgs = [{
      //       sourceMap: args[0].sourceMap,
      //       minimizerOptions: args[0].cssnanoOptions
      //     }]
      //     return newArgs
      //   })
    }
  },
}