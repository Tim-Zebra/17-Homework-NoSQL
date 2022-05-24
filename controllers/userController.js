const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Gets associated thoughts for user
const thoughts = async (userId) =>
  Thought.aggregate([
    { $match: { _id: ObjectId(userId) } },
    { $unwind: '$thoughts', },
  ]);

  const friends = async (userId) =>
  User.aggregate([
    { $match: { _id: ObjectId(userId) } },
    { $unwind: '$friends', },
  ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')  
      .populate({ path: 'thoughts', select: '-__v' })
      .populate( 'friends', '-__v' )
      .then((users) => res.json(users))
      .catch((err) => {
        console.log('This happened', err);
        return res.status(500).json(err);
      });
  },
  // Get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate({ path: 'thoughts', select: '-__v' })
      .populate( 'friends', '-__v' )
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      // find criteria
      { id: req.params.id},
      // updates user name and email
      { username: req.body.username,
        email: req.body.email,
      },
      // returns updated document
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  },
  // Delete a user and remove associated thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User not found' })
          : Thought.deleteMany(
              { username: user.username },
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'User deleted, but no associated thoughts',
            })
          : res.json({ message: 'User and thoughts successfully deleted' })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json('No friend found with that ID :('));
  },
};
