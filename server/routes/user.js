const express = require('express');
const consola = require('consola');
const router = express.Router();

// Mock Users
const users = [
  { name: 'Alexandre111' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
];

/* GET users listing. */
router.get('/users', function(req, res, next) {
  consola.info('用户列表' + new Date().getTime());
  res.json({
    code: 0,
    data: users
  });
});

/* GET user by ID. */
router.get('/users/:id', function(req, res, next) {
  consola.info('用户详情' + new Date().getTime());
  const id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json({
      code: 0,
      ...users[id]
    });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
