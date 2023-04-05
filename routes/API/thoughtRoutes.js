const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought
} = require('../../controllers/thoughtControllers')

router
  .route('/api/thoughts')
  .get(getThoughts)
  .post(createThought);

router
  .route('/api/thoughts/:userId')
  .get(getSingleThought)
  .post(createThought);
