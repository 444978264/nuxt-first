module.exports = {
  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: {
      total: true
    }
  },
  proxy: {
    '/proxy': {
      target: 'https://cnodejs.org/api/v1', // 测试
      secure: false,
      pathRewrite: { '^/proxy/': '/' }
    }
  }
};
