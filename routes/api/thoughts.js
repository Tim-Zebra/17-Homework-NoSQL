const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  
} = require('../../controllers/thoughtController');

// /api/thoughts
// Get all thoughts
router.route('/').get(getThoughts);

// /api/users/:id
// Get single thought by id
router.route('/:thougtId').get(getSingleThought);

// POST
// Create a new thought

// PUT
// Update a thought by id (possibly put in userId route)

// DELETE
// Delete a thought by id (possibly put in userId route)

// /api/thoughts/:thoughtId/reactions
// POST & // DELETE

module.exports = router;