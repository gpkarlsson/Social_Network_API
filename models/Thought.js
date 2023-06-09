const { model } = require('mongoose')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;``
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate');
const Types  = mongoose.Sche; // Import Types object from mongoose
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => formatDate(timestamp)
            //timestamp
            //getter method to format timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;