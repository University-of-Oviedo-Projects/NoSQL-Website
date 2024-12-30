const express = require('express');
const router = express.Router();
const session = require('./neo4jConnection');  

router.get('/', async (req, res) => {
  try {
    const result = await session.run(`
      MATCH (c:Country)-[:BELONGS_TO]->(a:Aliance)
      RETURN c.name AS country, a.name AS alliance
    `);
    const alliances = result.records.map(record => ({
      country: record.get('country'),
      alliance: record.get('alliance')
    }));
    res.json(alliances);
  } catch (error) {
    res.status(500).send('Error al obtener las alianzas');
  }
});

module.exports = router;
