const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const template = require('./generator/init');
const exts = Object.keys(template);

let [, , ...args] = process.argv;

let nodeParams = {};

args.forEach(param => {
  let [key, val = ''] = param.split('=');
  nodeParams[key] = val;
});

const CONFIG_DIR = nodeParams.dir;

function resolve(...filePath) {
  return path.resolve(__dirname, '../', CONFIG_DIR, ...filePath);
}

function exit() {
  return process.exit();
}

const log = {
  success() {
    return this.log(chalk.green(...arguments));
  },
  error() {
    return this.log(chalk.red(...arguments));
  },
  primary() {
    return this.log(chalk.blue(...arguments));
  },
  log() {
    console.log(...arguments);
  }
};

process.stdin.setEncoding('utf8');
log.primary(
  `请输入要创建的组件名称(根路径默认${CONFIG_DIR ? './' + CONFIG_DIR : './'})：`
);
log.success('多个路径请用 空格 隔开');
process.stdin.on('readable', () => {
  const fileDir = process.stdin.read().trim();
  if (fileDir !== null) {
    const filePaths = fileDir.split(' ');
    filePaths.filter(Boolean).forEach(fileDir => {
      console.log(fileDir, 'fileDir');
      init(fileDir);
    });
  }
});

process.stdin.on('end', () => {
  log.success('创建完成');
  exit();
});

// 创建文件夹
function mkdir(_dir) {
  // 文件夹是否存在
  const exists = fs.existsSync(_dir);
  console.log(exists, 'exists');
  if (exists) {
    log.success(`文件路径： ${_dir}`);
    return Promise.resolve(_dir);
  }

  return new Promise((resolve, reject) => {
    fs.mkdir(_dir, { recursive: true }, function(err, files) {
      console.log(err, files);
      if (err) {
        reject('创建失败');
        return log.error(err.stack);
      }
      log.success(`新建文件路径： ${_dir}`);
      resolve(_dir);
    });
  });
}

function init(fileDir) {
  if (fileDir.endsWith('/')) {
    log.error('请确保输入文件名，输入不能以/结尾');
    return exit();
  }
  const fileReg = /(\w*)(?:.(\w*))?$/;

  let [filename, name, ext] = fileReg.exec(fileDir);

  let hasExt = Boolean(ext);

  let _dir = resolve(fileDir); // 文件创建 路径
  let dirname = path.dirname(_dir);

  if (ext && !exts.includes(ext)) {
    return log.error(`创建失败::不存在该拓展名模版${ext}`);
  } else if (hasExt) {
    const exists = fs.existsSync(_dir);
    if (exists) {
      log.error('该文件已存在，请勿重复创建.');
      return exit();
    }
  }

  let madirPath = hasExt ? dirname : _dir;

  mkdir(madirPath).then(dirParh => {
    let writeEvent = createFile(dirParh);

    let fileName = ext ? filename : 'index.vue';

    if (hasExt) {
      writeEvent(fileName, template[ext]);
    } else {
      exts.forEach(ext => {
        writeEvent(fileName, template[ext]);
      });
    }
  });

  // 创建文件
  function createFile(dirPath) {
    log.primary('createFile:', madirPath);
    return function writeFile(fileName, res, templateParam = name) {
      if (Array.isArray(res)) {
        return res.forEach(tpl => {
          writeFile(ext, tpl);
        });
      }
      const { tpl } = res;
      let data = tpl(templateParam);
      let writePath = `${dirPath}/${fileName}`;
      log.primary(`${fileName} 开始创建`);

      const exists = fs.existsSync(writePath);

      if (exists) {
        log.error(`${writePath} 文件 已存在`);
      } else {
        fs.writeFile(writePath, data, err => {
          if (err) {
            log.error(`${fileName} 创建失败`);
            throw err;
          }
          log.success(`${fileName} 已完成创建(${writePath})`);
        });
      }
    };
  }
}
