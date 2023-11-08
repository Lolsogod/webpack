const isDev = process.env.NODE_ENV === "development";

module.exports = isDev
  ? require("./webpack.config.dev")
  : require("./webpack.config.prod");
