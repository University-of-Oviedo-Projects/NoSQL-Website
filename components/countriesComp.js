const express = require('express');
const router = express.Router();
const session = require('./neo4jConnection'); 

router.get('/', async (req, res) => {
  try {
    const result = await session.run('MATCH (c:Country) RETURN c.name AS name, c.continent AS continent');
    const countries = result.records.map(record => ({
      name: record.get('name'),
      continent: record.get('continent')
    }));
    res.json(countries);
  } catch (error) {
    res.status(500).send('Error al obtener los países');
  }
});

module.exports = router;
