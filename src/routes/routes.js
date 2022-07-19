/**
 * @file contains all the routes for the implemented endpoints
 */
import express from "express";
// const upload = require('../utils/mutler')
const multer = require("multer");

// local imports
import UserController from "../controllers/userController";
import BookController from "../controllers/bookController";
import { validate } from '../middleware/validator';
import Auth from '../middleware/auth';
import imageResize from "../middleware/imageResize";

// constants
const { createUser, loginUser } = UserController;
const { createBook, fetchBooks, updateBook, deleteBook } = BookController;
const { userAuth } = Auth;

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const routes = (app) => {
  //user routes
  app.route("/api/user").post(validate('userRegistration'), createUser);
  app.route("/api/user/login").post(validate('userLogin'), loginUser);

  //Book routes
  app.route("/api/books").get(userAuth, fetchBooks);
  app.route("/api/books").post(userAuth, upload.single('image'), imageResize, createBook);
  app.route("/api/books/:bookId").put(validate('bookCreation'), userAuth, updateBook);
  app.route("/api/books/:bookId").delete(userAuth, deleteBook);
  return app;
};

export default routes;
