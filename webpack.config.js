const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = env => {
  const isDev = env.WEBPACK_SERVE || false

  return {
    mode: isDev ? 'development' : 'production',
    entry: `./src/main.js`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
      clean: true
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
            plugins: [isDev && require('react-refresh/babel')].filter(Boolean)
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
      moduleIds: 'deterministic',
      // runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all'}
        },
      }
    },
    devServer: {
      host: 'localhost',
      port: 3000,
      // respond to 404s with home.html
      // historyApiFallback: true,
      // proxy: {
      //   '/google': {
      //     target: 'google.com',
      //     changeOrigin: true
      //   }
      // },
      // open the browser
      open: true,
      // enable Hot Module Replacement without page refresh as a fallback in case of build failures
      hot: 'only'
    }
  }
}
