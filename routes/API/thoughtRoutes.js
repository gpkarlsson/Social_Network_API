const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought
} = require('../../controllers/thoughtControllers')
