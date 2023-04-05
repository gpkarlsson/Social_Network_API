const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser
} = require('../../controllers/userControllers');


