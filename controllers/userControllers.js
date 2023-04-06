const { User, Reaction, Thought } = require("../models");


const userControllers = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbUserData) => {
        res.json(dbUserData)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  // GET a single user by its _id 
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },

  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then(console.log(req.body))
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
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No User found with this ID" })
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  //DELETE to remove a user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this ID" })
        }
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted" })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
    .then ((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this ID" });
      } 
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this ID" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },
};

module.exports = userControllers;
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



