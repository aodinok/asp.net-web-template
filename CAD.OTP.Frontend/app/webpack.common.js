
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [{
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['es2015', 'react', 'stage-2'],
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true
            }
          }]
      },
      {
        oneOf: [{
            test: /\.css$/,
            use: [
              'style-loader?sourceMap',
              'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [require('postcss-cssnext')]
                }
              }
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            },
          },
          // Add new loaders here, before the file-loader
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
        }]
      }
    ]
  }
}
