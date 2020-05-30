/**
 * @file contains all the routes for the implemented endpoints
 */
import express from "express";
import multer from "multer";

// local imports
import UserController from "../controllers/userController";
import BookController from "../controllers/bookController";
import { validate } from '../middleware/validator';
import Auth from '../middleware/auth'; 

// constants
const { createUser, loginUser } = UserController;
const { createBook, fetchBooks, updateBook, deleteBook} = BookController;
const { userAuth } = Auth;

//TODO: Fix Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};
const upload = multer({ storage: storage });

const routes = (app) => {
  //user routes
  app.route("/user").post(validate('userRegistration'), createUser);
  app.route("/user/login").post(validate('userLogin'), loginUser);

  //Book routes
  app.route("/books").get(userAuth, fetchBooks);
  app.route("/books").post(validate('bookCreation'),userAuth, createBook);
  app.route("/books/:bookId").put(validate('bookCreation'), userAuth, updateBook);
  app.route("/books/:bookId").delete(userAuth, deleteBook);
  return app;
};

export default routes;
