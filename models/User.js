const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
        match: [/.+@.+\..+/, "Must match an email address!"],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

userSchema.virtual("countFriends").get(function() {
    return this.friends.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;