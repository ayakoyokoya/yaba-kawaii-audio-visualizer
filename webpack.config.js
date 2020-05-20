const path = require("path");

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist/assets/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(glsl|vert|frag)$/,
        exclude: /node_modules/,
        loader: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader',
        //options: {
        //  limit: 2048,
        //  name: "../img/[name].[ext]",
        //},
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '../audio/[name].[ext]',
        },
      },
    ],
  },
  devServer: {
    open: true,
    openPage: 'index.html',
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 8080,
  },
};
