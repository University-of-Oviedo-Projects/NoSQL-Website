const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import the routes
const leadersRoute = require('./components/leadersComp');
const battlesRoute = require('./components/battlesComp');
const countriesRoute = require('./components/countriesComp');
const alliancesRoute = require('./components/alliancesComp');
const technologiesRoute = require('./components/technologiesComp');

// Use the routes in the app
app.use('/leaders', leadersRoute);
app.use('/battles', battlesRoute);
app.use('/countries', countriesRoute);
app.use('/alliances', alliancesRoute);
app.use('/technologies', technologiesRoute);

// Set express to use the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => { console.log(`Server running in http://localhost:${port}`); });
