const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === '123456') {
    let result = { username: 'demo', token: 'asldfjasdjf' };
    // 设置过期时间
    // req.session.cookie.maxAge = 60000
    // req.session.cookie.expires = new Date(Date.now() + 60 * 1000)
    return res.json({
      code: 0,
      message: '',
      data: result
    });
  }
  return res.json({
    code: -1,
    message: '账号或密码错误'
  });
  // res.status(401).json({ message: 'Bad credentials' });
});

router.post('/logout', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
