const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
// Get all thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
// Get single thought by id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// PUT
// Update a thought by id (possibly put in userId route)

// DELETE
// Delete a thought by id (possibly put in userId route)

// /api/thoughts/:thoughtId/reactions
// POST & // DELETE

module.exports = router;