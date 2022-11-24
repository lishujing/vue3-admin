const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
	publicPath: '/',
	transpileDependencies: true,
	// webpack devServer 提供了代理的功能，该代理可以把所有请求到当前服务中的请求，转发(代理)到另外的一个服务器上。
	devServer: {
		port: 6996, // 端口
		proxy: {
			'/esurfaceapp': {
				target: 'http://132.121.116.41:5003/', // 生产环境
				changeOrigin: true,
			},
		},
	},
	chainWebpack(config) {
		config.module.rule('svg').exclude.add(resolve('src/icons')).end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
			.end()
	},
	configureWebpack: {
		resolve: {
			fallback: { path: require.resolve('path-browserify') },
		},
	},
	lintOnSave: false,
})
