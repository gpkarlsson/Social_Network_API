const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser
} = require('../../controllers/userControllers');

// router.route('/').get(getUsers).post(createUser);

router
  .route('/api/users')
  .get(getUsers);

router
  .route('/api/:userId')
  .get(getSingleUser)
  .post(createUser);

  router
    .route('/api/users/:userId')
    .delete(deleteUser);


module.exports = router;