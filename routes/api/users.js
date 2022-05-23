const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
// Get all users, create user
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
// Get single user by id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// DELETE
// Delete a user by id (possibly put in userId route)
// Bonus Remove a users associated thoughts when deleted

// /api/users/:userId/friends/:friendId
// POST & // DELETE

module.exports = router;