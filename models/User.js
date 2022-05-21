const { Schema, model } = require('mongoose');
import isEmail from 'validator/lib/isEmail';
// Schema to create User model.
// Email validator obtained using validator.js from https://www.npmjs.com/package/validator
const userSchema = new Schema (
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: isEmail(v),
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      
    }
  }
)

// virtual that retrieves the length of the user's friends array field on query