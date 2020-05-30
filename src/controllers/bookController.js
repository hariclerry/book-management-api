/**
 * @file contains all endpoints for creating, retrieving, editing and deleting books
 */

//Third party imports
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//local imports
import Book from "../models/book";
import { validationResult } from "express-validator/check";

//constants
const { JWT_SECRET } = process.env;

class BookController {
  /**
   * @method fetchBooks
   * called when fetching books
   */

  static async fetchBooks(req, res) {
    try {
      const usertoken = req.headers["x-auth-token"];
      const user = jwt.verify(usertoken, JWT_SECRET);

      const books = await Book.find({ userId: user._id }).sort({ _id: -1 });
      res.status(200).send(books);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  /**
   * @method createBook
   * called when creating a book
   */
  static async createBook(req, res) {
    try {
      const { title, isbn, author, image } = req.body.data;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const usertoken = req.headers["x-auth-token"];
      const user = jwt.verify(usertoken, JWT_SECRET);

      const book = await Book.findOne({ isbn });
      if (book)
        return res.status(409).json({
          message: `Book with ${isbn} already exists`,
        });

      let newBook = new Book({
        title,
        isbn,
        author,
        image,
      });
      newBook.userName = user.userName;
      newBook.userId = user._id;

      const savedBook = await newBook.save();
      res.status(201).send({ data: savedBook, status: "Success" });
    } catch (error) {
      res.status(500).send({ Error: error.message });
    }
  }

  /**
   * @method updateBook
   * called when editing
   */
  static async updateBook(req, res) {
    try {
      const { title, isbn, author, image } = req.body;
      const { bookId } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).send({ message: `Invalid book ID` });
      }

      const book = await Book.findByIdAndUpdate(
        bookId,
        {
          title,
          isbn,
          author,
          image,
        },
        { new: true }
      );
      const savedBook = await book.save();

      if (!book) {
        return res
          .status(404)
          .send({ message: `Book with ID ${bookId} was not found` });
      }

      res.status(200).send({ data: savedBook, status: "Success" });
    } catch (error) {
      res.status(500).send({ Error: error.message });
    }
  }

  /**
   * @method deleteBook
   * called when deleting a book
   */
  static async deleteBook(req, res) {
    const { bookId } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).send({ message: `Invalid book ID` });
      }
      const book = await Book.findByIdAndRemove(bookId);

      if (!book)
        return res
          .status(404)
          .send({ message: `Book with ID ${bookId} was not found` });

      res.status(200).send({
        message: `Book with ID ${bookId} deleted successfully`,
      });
    } catch (error) {
      res.status(500).send({ Error: error.message });
    }
  }
}

export default BookController;
