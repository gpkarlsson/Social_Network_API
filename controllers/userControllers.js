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
      .then((dbUserData) => {
        res.json(dbUserData)
        console.log(req.body)
      })
      .catch((err) => {
        res.status(500).json(err)
      });
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
          return res.status(404).json({ message: "No User found with this ID" });
        }
        // Get User's `thoughts` IDs and delete them all
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and thoughts deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // createFriend(req, res) {
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $addToSet: { friends: req.params.friendId } },
  //     { new: true }
  //   )
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res.status(404).json({ message: "No user found with this ID" });
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
  
  createFriend(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user found with this ID" });
        }

        // Check if friendId is already in user's friend list
        if (user.friends.includes(req.params.friendId)) {
          return res.status(400).json({ message: "Friend relationship already exists" });
        }

        // Add friendId to user's friend list
        user.friends.push(req.params.friendId);
        return user.save();
      })
      .then((user) => {
        // Check if userId is already in friend's friend list
        return User.findOne({ _id: req.params.friendId });
      })
      .then((friend) => {
        if (!friend) {
          return res.status(404).json({ message: "No user found with this ID" });
        }

        if (friend.friends.includes(req.params.userId)) {
          return res.status(400).json({ message: "Friend relationship already exists" });
        }

        // Add userId to friend's friend list
        friend.friends.push(req.params.userId);
        return friend.save();
      })
      .then((friend) => {
        res.json({ message: "Friend relationship created" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  

//   deleteFriend(req, res) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $pull: { friends: req.params.friendId } },
//       { new: true }
//     )

//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "No user found with this ID" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       })
//   },
// };

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
  }
};

module.exports = userControllers;
