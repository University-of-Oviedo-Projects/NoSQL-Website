const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json()); 

app.use(session({
  secret: 'mysecret', 
  resave: false, 
  saveUninitialized: true, 
  cookie: { secure: false } 
}));

// Importar las rutas desde los componentes
const leadersRoute = require('./components/leadersComp');
const battlesRoute = require('./components/battlesComp');
const countriesRoute = require('./components/countriesComp');
const alliancesRoute = require('./components/alliancesComp');
const technologiesRoute = require('./components/technologiesComp');
const { router } = require('./components/neo4jConfigComp');

// Asociar las rutas a las URL correspondientes
app.use('/leaders', leadersRoute);
app.use('/battles', battlesRoute);
app.use('/countries', countriesRoute);
app.use('/alliances', alliancesRoute);
app.use('/technologies', technologiesRoute);

// Ruta para manejar la configuración de Neo4j
app.use('/config', router);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
