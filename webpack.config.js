const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

module.exports = {
    mode: 'development',
    devServer: {
      open: true,
      hot: true,
      port: 8080,
    },

    entry: './src/js/index.js',
 

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
      {
        test: /\.(ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]'
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader","css-loader","sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html'
      })
    ]
}
          
          
        