const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      //???
      
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp)
    }
  }
)

module.exports = reactionSchema;

//! not a model, but used in reaction field's subdocument schema in the Thought model. Move to Thought.js ???