const path = require('path')
const shell = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const distDir = path.resolve('dist')

module.exports = (env, argv) => {
  const prodMode = argv.mode === 'production'
  if (prodMode) {
    shell.rm('-rf', distDir)
    shell.mkdir('-p', distDir)
    // shell.cp('-R', path.resolve('assets'), distDir)
  }

  return {
    mode: argv.mode || 'development',
    entry: `./src/main.js`,
    output: {
      path: distDir,
      filename: prodMode ? '[name].[chunkhash:8].js' : '[name].js',
      chunkFilename: prodMode ? '[name].[chunkhash:8].js' : '[name].js'
    },
    module: {
      rules:[
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: argv.mode !== 'production',
              },
            },
            'css-loader', 'sass-loader']
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({template: `./src/index.html`}),
      new MiniCssExtractPlugin({
        filename: prodMode ? '[name].[contenthash:8].css' : '[name].css'
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    devServer: {
      host: 'localhost',
      port: 3000,
      // respond to 404s with index.html
      historyApiFallback: true,
      // open the browser
      open: true,
      hot: true,
    }
  }
}