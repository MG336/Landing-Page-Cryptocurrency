const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const devServer = (isDev) => !isDev ? {} : {
//   devServer: {
//       open: true,
//       hot: true,
//       port: 8080,
//   }
// };

module.exports = ()=> ({
  // mode: develop ? 'development' : 'production',
    mode: 'production',
    // mode: 'development',

    entry: {
      index:'./src/index.js',
    },
 

    output: {
        path: path.resolve(__dirname, 'dist3'),
        filename: '[name].[contenthash:8].js',
        clean: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: './styles/style.css',
      })
    ],

    module: {
      rules: [
          {
              test: /\.(mp4|WebM|gif)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'video/[contenthash:8][ext][query]'
              }
          },
          {
            test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'img/[contenthash:8][ext][query]'
            }
          },
          {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[contenthash:8][ext][query]'
            }
          },
          {
              test: /\.css$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader'
              ]
          },
          {
              test: /\.scss$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
              ]
          },
          
          {
            test: /\.html$/i,
            loader: 'html-loader'
        },
      ]
  },

})
          
          
        