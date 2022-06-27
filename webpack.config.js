const path = require('path')
// const shell = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const distDir = path.resolve('dist')

module.exports = env => {
  const isDev = env.WEBPACK_SERVE || false
  // if (isDev) {
  //   shell.rm('-rf', distDir)
  //   shell.mkdir('-p', distDir)
  //   // shell.cp('-R', path.resolve('assets'), distDir)
  // }

  return {
    mode: isDev ? 'development' : 'production',
    entry: `./src/main.js`,
    output: {
      path: distDir,
      filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
      chunkFilename: isDev ? '[name].js' : '[name].[chunkhash:8].js'
    },
    module: {
      rules:[
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', {runtime: 'automatic'}]
            ],
            plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean)
          }
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new ESLintPlugin(),
      new HtmlWebpackPlugin({template: `./src/index.html`}),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[contenthash:8].css'
      }),
      isDev && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all'}
        },
      }
    },
    devServer: {
      host: 'localhost',
      port: 3000,
      // respond to 404s with index.html
      historyApiFallback: true,
      // open the browser
      open: true,
      // enable Hot Module Replacement without page refresh as a fallback in case of build failures
      hot: 'only',
    }
  }
}
