const isDev = process.env.NODE_ENV !== 'production';
const ENV_CONFIG = isDev ? 'nuxt.dev' : 'nuxt.prod';
const mergeConfig = require(`./${ENV_CONFIG}`);
console.log('isDev:', isDev);
module.exports = mergeConfig;
