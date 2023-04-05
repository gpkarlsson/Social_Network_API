const { User, Reaction, Thought} = require('../models');


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
  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((User) => 
        !User
          ? res.status(404).json({ message: 'No User found with this Id!' })
          : res.json(User)
      )
  },
  //DELETE to remove a user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user found with that ID' })
        :application.deleteMany({ _id: { $in: User.thoughts} }) // ???
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },
};
//ROUTES
//TODO
//!  /api/users



// 
  // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }




//BONUS: remove user's associated thoughts when deleted

//! /api/users/:userId/friends/:friendId
  // POST to add a new friend to a user's friend list (push into array)
  //$set (?)
  // DELETE to remove a friend from a user's friend list



