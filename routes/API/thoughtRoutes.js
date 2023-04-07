const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtControllers')

router
  .route('/')
  .get(getThoughts)
  .post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .post(createThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction)

  module.exports = router;