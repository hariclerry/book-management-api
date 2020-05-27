/**
 * @file contains all the routes for the implemented endpoints
 */
import express from "express";

// local imports
import UserController from "../controllers/userController";
import { validate } from '../middleware/validator'

// constants
const Router = express.Router();
const { createUser, loginUser } = UserController;

const routes = (app) => {
  //user routes
  app.route("/user").post(validate('userRegistration'), createUser);
  app.route("/user/login").post(validate('userLogin'), loginUser);
  return app;
};

export default routes;
