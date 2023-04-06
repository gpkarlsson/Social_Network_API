const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/userControllers');

// router.route('/').get(getUsers).post(createUser);

router
  .route('/api/users')
  .get(getUsers);

router
  .route('/api/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .post(createUser);

router
  .route('/api/users/:userId')
  .delete(deleteUser);

//Create and Delete friends 
router.route('/api/users/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend)

module.exports = router;