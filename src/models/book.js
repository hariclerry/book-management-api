/**
 * @file creates the book schema
 */

// Third party imports
import mongoose from "mongoose";

//constants
const Schema = mongoose.Schema;

// create schema
const bookSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  image: {
    type:Object,
     required:false
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
