const router = require('express').Router();
const {
  getUsers
} = require('../../controllers/userController');

// /api/users
// Get all users
router.route('/').get(getUsers);

// /api/users/:id
// Get single user by id
router.route('/:userId').get()

module.exports = router;