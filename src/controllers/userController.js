/**
 * @file contains all endpoints for creating or registering a new user and user login
 */

//Third party imports
import bcrypt from "bcrypt";

//local imports
import User from "../models/user";
import {validationResult} from 'express-validator/check'; 

class UserController {
  /**
   * @method createUser
   * called when creating a new user
   */
  static async createUser(req, res) {
    try {
      const errors = validationResult(req)
      const { userName, email, password } = req.body;
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
    }

      let user = await User.findOne({ email });
      if (user)
        return res.status(400).send({ message: "User already registered." });

      user = new User({ userName, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      res.status(201).send({
        user: {
          userId: user._id,
          userName: user.userName,
          email: user.email,
        },
        message: "Successfully registered",
      });
    } catch (error) {
      res.status(500).send({ Error: error.message });
    }
  }

  /**
   * @method loginUser
   * called when logging in a user
   */
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
    }

      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .send({ message: "Invalid email or password." });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).send({ message: "Invalid password." });

      const token = user.generateAuthToken();
      res.status(200).send({ token, message: "Login successful." });
    } catch (error) {
      res.status(500).send({ Error: error.message });
    }
  }
}

export default UserController;
