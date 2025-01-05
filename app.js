const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000; 
const app = express();

const corsOptions = {
  origin: 'https://adrianmfuentes.github.io', // The frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // The HTTP methods allowed
  credentials: true, // Enable credentials
};

app.use(cors(corsOptions)); // Apply the CORS options
app.use(express.json()); // We use the express.json() middleware to parse the JSON body of the requests

// Import the routes
const leadersRoute = require('./components/leadersComp');
const battlesRoute = require('./components/battlesComp');
const countriesRoute = require('./components/countriesComp');
const alliancesRoute = require('./components/alliancesComp');
const technologiesRoute = require('./components/technologiesComp');
const { router } = require('./components/neo4jConfigComp');

// We protect the routes with the checkNeo4jConfig middleware
app.use('/config', router); // This rute has access to the Neo4j configuration
app.use('/leaders', leadersRoute);
app.use('/battles', battlesRoute);
app.use('/countries', countriesRoute);
app.use('/alliances', alliancesRoute);
app.use('/technologies', technologiesRoute);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
