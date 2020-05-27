/**
 * @file contains all the routes for the implemented endpoints
 */
import express from "express";

// local imports
import UserController from "../controllers/userController";
import BookController from "../controllers/bookController";
import { validate } from '../middleware/validator'

// constants
const Router = express.Router();
const { createUser, loginUser } = UserController;
const { createBook, fetchBooks, updateBook, deleteBook} = UserController;

const routes = (app) => {
  //user routes
  app.route("/user").post(validate('userRegistration'), createUser);
  app.route("/user/login").post(validate('userLogin'), loginUser);

  //Book routes
  app.route("/books").get(fetchBooks);
  app.route("/books").post(validate('bookCreation'), createBook);
  app.route("/books/:id").put(validate('bookCreation'), updateBook);
  app.route("/books/:id").delete(deleteBook);
  return app;
};

export default routes;
