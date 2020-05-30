/**
 * @file contains middleware function for user auth using JWT token
 */

// Third party imports
import jwt from 'jsonwebtoken';
require('dotenv').config()

//constants
const { JWT_SECRET } = process.env

class Auth {
    static userAuth(req, res, next) {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send('Access denied. No token provided.');
      
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          req.user = decoded;
          next();
        } catch (ex) {
          res.status(400).send('Invalid token.');
        }
    }
  }
  
  export default Auth;