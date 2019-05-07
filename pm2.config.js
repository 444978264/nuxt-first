const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}
module.exports = {
  apps: [
    {
      name: 'aha',
      script: 'npm',
      args: 'run start',
      cwd: './',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: './logs/out-0.log',
      error_file: './logs/err-0.log',
      // exec_interpreter: 'babel-node',
      // min_uptime: 60, // 最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
      // max_restarts: 15, // 设置应用程序异常退出重启的次数，默认15次（从0开始计数）
      log_type: 'json',
      instances: 1,
      autorestart: true,
      watch: ['./'],
      ignore_watch: ['node_modules', 'logs', 'static'],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT,
        HOST: process.env.HOST
      }
    }
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload pm2.config.js --env production'
    }
  }
};
