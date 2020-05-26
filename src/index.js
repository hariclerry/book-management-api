/**
 * @file responsible for server startup and running
 */

// local imports
import app from './app';
import models, { connectDb } from './models';

// constants
const port = process.env.PORT || 8000;

connectDb().then(async () => {
    app.listen(port, () => console.log(`listening on port ${port}...`));
  });

