console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
module.exports = {
  // 开发环境
  development: {
    server: {
      port: process.env.PORT || 3000, // default: 3000
      host: '0.0.0.0', // default: localhost,
      timing: {
        total: true
      }
    },
    proxy: {
      '/proxy': {
        // target: 'https://openapi2.ahaschool.com.cn/v1', // 线上
        target: 'https://api-test2.d.ahaschool.com', // 测试
        secure: false,
        // target: 'https://openapi2.ahaschool.com.cn/v1', // 开发
        pathRewrite: { '^/proxy/': '/' }
      }
    }
  },
  // 生产环境
  get production() {
    const result = require('dotenv').config();
    if (result.error) {
      throw result.error;
    }
    return {
      server: {
        port: 3002,
        host: process.env.HOST || '0.0.0.0',
        timing: {
          total: true
        }
      },
      proxy: {
        '/proxy': {
          target: process.env.API_DOMAIN || 'https://api-test2.d.ahaschool.com', // 测试
          secure: false,
          pathRewrite: { '^/proxy/': '/' }
        }
      }
    };
  }
}[process.env.NODE_ENV || 'development'];
