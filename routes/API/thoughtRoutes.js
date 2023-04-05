const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought
} = require('../../controllers/thoughtControllers')

router
  .route('/api/thought')
  .get(getThoughts)
  .post(createThought);

router
  .route('/api/thought/:userId')
  .get(getSingleThought)
  .post(createThought);
