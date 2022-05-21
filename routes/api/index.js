const router = require('express').Router();
const users = require('./users');
// const b = require('./');

router.use('/users', users);
// router.use('/', b);

module.exports = router;
