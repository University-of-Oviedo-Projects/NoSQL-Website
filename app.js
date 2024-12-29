const express = require('express');
const neo4j = require('neo4j-driver');
const path = require('path');

const app = express();
const port = 3000;

// Connect to Neo4j
const driver = neo4j.driver(
  'bolt://localhost:7687', // URL 
  neo4j.auth.basic('neo4j', 'password') // Credentials
);

// Create a session to run queries
const session = driver.session();

// Set express to use the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Main route to serve the index.html file
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'views', 'index.html')); 
});

// Route to get leaders
app.get('/leaders', async (req, res) => {
  try {
    const result = await session.run('MATCH (l:Leader) RETURN l.name, l.birth_year');

    const leaders = result.records.map(record => ({
      name: record.get('l.name'),
      birthYear: record.get('l.birth_year')
    }));

    res.json(leaders);
  } catch (error) { res.status(500).send('Error al obtener los líderes'); }
});

// Route to get battles
app.get('/battles', async (req, res) => {
  try {
    const result = await session.run('MATCH (b:Battle) RETURN b.name, b.year');

    const battles = result.records.map(record => ({
      name: record.get('b.name'),
      year: record.get('b.year')
    }));

    res.json(battles);
  } catch (error) { res.status(500).send('Error al obtener las batallas'); }
});

// Route to get technologies
app.get('/technologies', async (req, res) => {
  try {
    const result = await session.run('MATCH (t:Technology) RETURN t.name');

    const technologies = result.records.map(record => ({
      name: record.get('t.name')
    }));

    res.json(technologies);
  } catch (error) { res.status(500).send('Error al obtener las tecnologías'); }
});

// Start the server
app.listen(port, () => { console.log(`Servidor corriendo en http://localhost:${port}`); });
