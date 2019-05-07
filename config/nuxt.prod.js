const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const result = require('dotenv').config();
// const CleanWebpackPlugin = require('clean-webpack-plugin');
if (result.error) {
  throw result.error;
}

const resolve = filePath => {
  return path.resolve(__dirname, filePath);
};

const buildDir = resolve('../../aha-v-dist');
const rootDir = resolve('../');

const copyPath = [
  'server',
  'config',
  'nuxt.config.js',
  'pm2.config.js',
  'node_modules',
  ['.env', true],
  'static',
  'package.json'
];

const plugins = [
  // new (require('clean-webpack-plugin'))({
  //   dry: false,
  //   cleanOnceBeforeBuildPatterns: [`${buildDir}/build`],
  //   // exclude: ['files', 'to', 'ignore'],
  //   dangerouslyAllowCleanPatternsOutsideProject: true
  // })
  new CopyPlugin(
    copyPath.map(res => {
      const IS_ROOT = false;
      let toPath = `${buildDir}/${res}`;
      let fromPath = res;
      if (Array.isArray(res)) {
        const [filename, isRoot = IS_ROOT] = res;
        fromPath = filename;
        isRoot && (toPath = buildDir);
      }
      return {
        from: `${rootDir}/${fromPath}`,
        to: toPath
      };
    })
  )
];

// 生产配置
const CONFIG = {
  host: process.env.HOST || '0.0.0.0',
  api: process.env.API_DOMAIN,
  port: process.env.PORT
};

console.log(CONFIG, 'CONFIG');

module.exports = {
  buildDir: `${buildDir}/build`,
  axios: {
    credentials: false,
    baseURL: `http://${CONFIG.host}:${CONFIG.port}`
  },
  proxy: {
    '/proxy': {
      target: CONFIG.api, // 测试
      secure: false,
      pathRewrite: { '^/proxy/': '/' }
    }
  },
  server: {
    port: CONFIG.port,
    host: CONFIG.host,
    timing: {
      total: true
    }
  },
  build: {
    extractCSS: true,
    optimizeCSS: true,
    terser: {
      terserOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'initial',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 4,
        maxInitialRequests: 4,
        name: true,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          element: {
            filename: '[name].[chunkhash].js',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 1
          },
          videoComponent: {
            filename: '[name].[chunkhash].js',
            test: /[\\/]node_modules[\\/](vue-video-player|videojs-contrib-hls)[\\/]/,
            priority: 1
          },
          videojs: {
            chunks: 'all',
            name: 'video.min',
            test: /[\\/]node_modules[\\/]video\.js[\\/]/,
            enforce: true
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            filename: '[name].[chunkhash].js',
            priority: -1
          }
        }
      },
      runtimeChunk: false
    },
    plugins
  }
};
