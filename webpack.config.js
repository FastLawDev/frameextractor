const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

function getPlugin() {
    if(process.env.NODE_ENV === 'production') {
       return [
         new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
         new MiniCssExtractPlugin()
        ];
    } else {
        return [
          new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
          new webpack.HotModuleReplacementPlugin()
        ];
    }
}

module.exports = {
  entry: {
    app: ['./src/App.tsx'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { 
              minimize: true
            }
          },
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: getPlugin(),
  mode: "production"
}
