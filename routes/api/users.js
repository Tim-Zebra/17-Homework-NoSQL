const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  
} = require('../../controllers/userController');

// /api/users
// Get all users
router.route('/').get(getUsers);

// /api/users/:id
// Get single user by id
router.route('/:userId').get(getSingleUser)

module.exports = router;