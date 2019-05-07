const path = require('path');
const pkg = require('../package');

const resolve = filePath => {
  return path.resolve(__dirname, filePath);
};

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'description', name: 'keywords', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: ['~assets/css/normalize.css', '~assets/css/base.less'],
  plugins: [
    { src: '@/plugins/util/index', mode: 'client' },
    '@/plugins/element-ui/index',
    { src: '@/plugins/axios/interceptors.server' },
    { src: '@/plugins/axios/index', mode: 'client' },
    { src: '@/plugins/cookie', mode: 'client' }
  ],
  modules: [
    // ['@nuxtjs/dotenv', { systemvars: !isDev }],
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/component-cache'
  ],
  serverMiddleware: ['~server/routes'],
  styleResources: {
    less: [resolve('../assets/css/theme.less')]
  },
  build: {
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: '~plugins/element-ui/src',
            ext: '.scss'
          }
        ]
      ]
    }
  }
};
