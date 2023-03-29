const Schema = require('mongoose');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //between 1 and 280 chars
        },
        createdAt: {
            type: Date,
            default: putSomethingHere, //timestamp
            //getter method to format timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            //array of nested docs created with the reactionSchema
        }
    })