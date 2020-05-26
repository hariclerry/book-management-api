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
    required: true
  },
  isbn: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 12,
    unique: true
  },
  author: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
  },
  image: {
    type: String,
    required: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
