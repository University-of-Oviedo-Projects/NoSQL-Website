/**
 * @file app.js
 * @description This file sets up and starts a web server using Node.js and the Express framework. 
 * The server serves static files from the 'public' folder and defines routes for various components.
 * 
 * @requires express - A Node.js framework for building web applications and APIs.
 * @requires path - A native Node.js module for handling and transforming file paths.
 * 
 * @see {@link https://expressjs.com/} - Official Express.js documentation.
 * @see {@link https://nodejs.org/en/docs/} - Official Node.js documentation.
 * 
 * @example
 * // To install the required dependencies, execute the following command in the terminal:
 * npm install
 * 
 * // To run this server, execute the following command in the terminal:
 * node app.js
 * 
 * // Once running, the server will be available at:
 * http://localhost:3000
 */

const express = require('express'); // Import the Express framework for building web servers.
const path = require('path'); // Node.js module for working with file paths.

const port = 3000;
const app = express();

/**
 * Import routes from external modules.
 * Each of these modules defines specific logic for specific routes.
 */
const leadersRoute = require('./components/leadersComp'); 
const battlesRoute = require('./components/battlesComp'); 
const countriesRoute = require('./components/countriesComp'); 
const alliancesRoute = require('./components/alliancesComp'); 
const technologiesRoute = require('./components/technologiesComp'); 

/**
 * Associate each route module with a URL prefix.
 */
app.use('/leaders', leadersRoute);
app.use('/battles', battlesRoute);
app.use('/countries', countriesRoute);
app.use('/alliances', alliancesRoute);
app.use('/technologies', technologiesRoute);

/**
 * Serve static files from the 'public' directory.
 *
 * @example:
 * - A file located at 'public/index.html' will be available at:
 *   http://localhost:3000/index.html
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Start the server and listen on the specified port.
 * Once the server is running, it logs a message to the console indicating its address.
 */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
