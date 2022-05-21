const router = require('express').Router();
const a = require('./');
const b = require('./');

router.use('/', a);
router.use('/', b);

module.exports = router;
