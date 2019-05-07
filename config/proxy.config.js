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
      // target: 'https://openapi2.ahaschool.com.cn', // 线上
      target: 'https://api-test2.d.ahaschool.com', // 测试
      secure: false,
      pathRewrite: { '^/proxy/': '/' }
    }
  }
};
