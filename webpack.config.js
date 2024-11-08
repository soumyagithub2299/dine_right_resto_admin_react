module.exports = {
    // other configuration options
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
        // other rules
      ],
    },
  };
  