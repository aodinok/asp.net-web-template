const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
    entry: [
      // activate HMR for React
      'react-hot-loader/patch',
      './src/index.dev.js'
    ],
    output: {
      publicPath: 'http://localhost:8080/'
    },
    devtool: 'inline-source-map',
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
          __DEVELOPMENT__: true
      })
    ],
    stats: {
        colors: true
    }
})
