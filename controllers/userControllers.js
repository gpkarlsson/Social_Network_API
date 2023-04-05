const User = require('../models/User');


module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
  },
// GET a single user by its _id 
//TODO: populated THOUGHT and FRIEND data

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((user) => 
    !user
      ? res.status(404).json({ message: "No user found with that ID"})
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err))
  },
  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
}
//ROUTES
//TODO
//!  /api/users



// 
  // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }

// PUT to update a user by its _id

//DELETE to remove a user by its _id

//BONUS: remove user's associated thoughts when deleted

//! /api/users/:userId/friends/:friendId
  // POST to add a new friend to a user's friend list (push into array)

  // DELETE to remove a friend from a user's friend list



