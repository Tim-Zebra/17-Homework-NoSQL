const { Schema, Types } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date().getMonth().getDate().getFullYear(),
    },
    id: false,
  }
);

module.exports = reactionSchema;