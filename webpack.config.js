const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/ngtzekean.github.io/", // Update to your GitHub repository name
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public", // Folder where your images are
          to: "public", // Copy everything from 'public' to 'dist/public'
        },
      ],
    }),
  ],
  optimization: {
    minimize: true, // Minify JavaScript and CSS for production
  },
  devServer: {
    static: path.join(__dirname, "public"),
    port: 8080,
    open: true,
    compress: true,
    hot: true,
    client: {
      logging: "info",
    },
  },
};