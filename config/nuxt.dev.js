const { server, proxy } = require('./config.generator');
const { env, host, port, proxyTarget, prefix } = require('./proxy.config');

module.exports = {
  proxy: proxy(prefix, proxyTarget),
  server: server(host, port),
  env,
  axios: {
    // debug: true
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
