const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  addReaction
} = require('../../controllers/thoughtControllers')

router
  .route('/')
  .get(getThoughts)
  .post(createThought);

router
  .route('/thoughts/:userId')
  .get(getSingleThought)
  .post(createThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction)

  module.exports = router;