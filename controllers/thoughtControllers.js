const { User, Reaction, Thought } = require('../models');
const mongoose = require('mongoose');
const reactionSchema = require('../models/Reaction');

//ROUTE
const thoughtControllers = {
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Thought created, no User found with this ID" });
        }
        res.json({ message: "Successfully created thought" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Delete a thought

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found with this ID" });
        }

        //Remove Thought ID from user's 'thoughts' field
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Thought created, no User found with this ID" })
        }
        res.json({ message: "Successfully deleted thought" })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Add reaction to Thought
  addReaction(req, res) {
    // const newReaction = { ...req.body, reactionId: new mongoose.Types.ObjectId() }
    console.log(req.params.thoughtId)
    Thought.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.thoughtId) },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Remove reaction from Thought
  removeReaction(req, res) {
    //   Thought.deleteOne(
    //   { _id: req.params.thoughtId },
    //   { $pull: { reactions: { reactionId: req.params.reactionId } } },
    //   { runValidators: true, new: true }
    // )
    //   .then((dbThoughtData) => {
    //     if (!dbThoughtData) { 
    //       return res.status(404).json({ message: "No thought found with this ID" });
    //     }
    //     res.json(dbThoughtData);
    //   })
    Thought.deleteOne(
      { _id: req.params.thoughtId, "reactions.reactionId": req.params.reactionId },
      function(err, dbThoughtData) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found with this ID" });
        }
        res.json(dbThoughtData);
      }
    )
      //   .catch((err) => {
      //   console.log(err);
      //   res.status(500).json(err);
      // });
  },
};

module.exports = thoughtControllers;
