const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin({})],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
  },
};
