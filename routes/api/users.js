const router = require('express').Router();
const {

} = require('../../controllers/userController');

// /api/users
// Get all users
router.route('/').get()

// /api/users/:id
// Get single user by id
router.route('/:userId').get()

module.exports = router;