const express = require('express');
const bodyParser = require('body-parser');
const userAuth = require('./userAuth');
const user = require('./user');
const router = express.Router();

router
  // 此中中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
  .use(bodyParser.urlencoded({ extended: true }))
  // 判断请求体格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
  .use(bodyParser.json())
  .use(userAuth)
  .use(user);

module.exports = {
  path: '/api',
  handler: router
};
