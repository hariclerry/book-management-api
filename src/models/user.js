/**
 * @file creates the user schema
 * handles token generation logic
 */

// Third party imports
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
require('dotenv').config()

//constants
const { JWT_SECRET } = process.env
const Schema = mongoose.Schema;

// create schema
const userSchema = Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  created: {
    type: Date,
    default: Date.now
  }
});

/**
 * @function generateAuthToken
 * called when generating token
 */
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, userName: this.userName }, JWT_SECRET);
  return token;
};

const User = mongoose.model('User', userSchema);
export default User;
