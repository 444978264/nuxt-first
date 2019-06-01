const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const result = require('dotenv').config();
const shell = require('shelljs');
const { server, proxy } = require('./config.generator');
const prefix = require('./proxy.config').prefix;

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
  // 'node_modules',
  ['.env', true],
  'static',
  'package.json'
];

const plugins = [
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
// 文件中的环境变量
const Env = {
  WX_DOMAIN: process.env.WX_DOMAIN,
  SECRET_KEY: process.env.SECRET_KEY
};

module.exports = {
  env: Env,
  buildDir: `${buildDir}/build`,
  proxy: proxy(prefix, CONFIG.api),
  server: server(CONFIG.host, CONFIG.port),
  hooks: {
    build: {
      // 使用shell 命令要注意安全
      before(builder) {
        if (fs.existsSync(buildDir)) {
          console.log('打包前的任务');
          console.log('开始清理目录', buildDir);
          if (shell.exec(`rm -r ${buildDir}/`).code !== 0) {
            shell.echo('Error: 清理文件失败');
            shell.exit(1);
          }
        } else {
          console.log('路径不存在,不需要清理');
        }
      },
      done(nuxt) {
        shell.cp('-R', './node_modules', `${buildDir}/`);
      }
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
    postcss: {
      plugins: {
        'postcss-plugin-px2rem': {
          rootValue: 144,
          // unitPrecision: 5, // 允许REM单位增长到的十进制数字。
          exclude: /(node_module)/,
          selectorBlackList: [/^\.el-/],
          mediaQuery: false,
          minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
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
