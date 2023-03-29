const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
    },
        email: {
            type: String,
            required: true,
            unique: true,
            //mongoose email validation
        },
    
        thoughts: {
            //array of _id values referencing Thought model
        },

        friends: {
            //array of _id values referencing User model
        }
        //virtual called 'friendCount' that retrieves length of user's friends array field on query
        
})

const User = mongoose.model('User', userSchema);

module.exports = User;