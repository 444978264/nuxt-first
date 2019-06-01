module.exports = {
  host: '0.0.0.0',
  port: 3000,
  prefix: '/proxy',
  proxyTarget: 'https://baidu.com',
  env: {
    WX_DOMAIN: 'https://baidu.com'
  }
};
