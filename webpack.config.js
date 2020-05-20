const path = require("path");

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist/assets'),
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
          name: '[name].[ext]',
          outputPath: 'audio/',
          publicPath: (path) => '/assets/audio/' + path,
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
