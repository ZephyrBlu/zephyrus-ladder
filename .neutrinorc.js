module.exports = {
  use: [
    ['@neutrinojs/dev-server', {
      publicPath: '/JSON/',
      headers: {
        stats: {
          publicPath: true,
        },
      },
    }],
    ['@neutrinojs/airbnb', {
      eslint: {
        rules: {
          "linebreak-style": ["error", "windows"],
          "indent": ["error", 4, { "SwitchCase": 1 }],
          "react/jsx-indent": ["error", 4],
          "react/jsx-indent-props": ["error", 4],
          "react/prop-types": 0,
          "react/no-multi-comp": 0,
          "react/no-array-index-key": 0,
          "no-console": "off",
          "react/prefer-stateless-function": 0,
          "max-len": 0,
          "jsx-a11y/mouse-events-have-key-events": 0,
          "jsx-a11y/label-has-for": { "some": [ "nesting", "id" ] },
          "no-unused-vars": 0,
          "consistent-return": 0,
        }
      }
    }],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'StarCraft II Ladder'
        }
      }
    ],
    // (neutrino) => {
    //   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    //   // neutrino.config.output.filename('[name].js');
    //   // neutrino.config
    //   //   .plugin('stats')
    //   //     .use(BundleAnalyzerPlugin);
    // },
    (neutrino) => {
      neutrino.config.module
        .rule('postcss')
          .test(/\.css$/)
          .use('postcss')
            .loader('postcss-loader');
    },
  ]
};
