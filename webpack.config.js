module.exports = {
  mode: 'development',
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              jsx: true,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
