const { proxy, server } = require('./proxy.config');

module.exports = {
  proxy,
  server,
  axios: {
    baseURL: `http://${server.host}:${server.port}`,
    debug: true
  },
  build: {
    devtools: true,
    cssSourceMap: true,
    extend(config, { isClient }) {
      config.devtool = 'cheap-module-eval-source-map';
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
