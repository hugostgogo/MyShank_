module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
    }
  },
  chainWebpack: config => {
    const html = config.plugin('html')
    console.log(html)
    html.tap(args => {
      args[0].title = 'MY SHANK'
      return args
    })
  }
}
