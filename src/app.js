/**
 * @file is the application entry point, initialises the application
 */

// Third party imports
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

require('dotenv').config();

// local imports
import routes from "./routes/routes";

// initializes express app
const app = express();

// third party middleware
app.use(cors());
// app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// inital route
routes(app);
app.get('/', (req, res) => {
  res.send('Hello user, welcome to Book management Application');
});

// Cater to invalid routes
app.all('*', (req, res) => {
  res.status(200).send('Oooooops, wrong endpoint!');
});

export default app;