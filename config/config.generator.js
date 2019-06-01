module.exports = {
  server(host, port) {
    return {
      port: port,
      host: host,
      timing: {
        total: true
      }
    };
  },
  proxy(prefix, proxyTarget) {
    return {
      [prefix]: {
        target: proxyTarget, // 测试
        secure: false,
        pathRewrite: { [`^${prefix}`]: '' }
      }
    };
  }
};
