const { Schema, model } = require('mongoose');
const Schema = mongoose.Schema;
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/formatDate');

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

const Thought = model('thought', thoughtSchema);

module.exports = Thought;