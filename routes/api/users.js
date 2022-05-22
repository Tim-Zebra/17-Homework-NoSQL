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

// POST
// Create a new user

// PUT
// Update a user by id (possibly put in userId route)

// DELETE
// Delete a user by id (possibly put in userId route)
// Bonus Remove a users associated thoughts when deleted

// /api/users/:userId/friends/:friendId
// POST & // DELETE

module.exports = router;