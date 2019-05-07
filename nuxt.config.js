const webpackMerge = require('webpack-merge');
const common = require('./config/nuxt.common');
const mergeConfig = require('./config/index');

const options = webpackMerge(common, mergeConfig);

module.exports = options;
