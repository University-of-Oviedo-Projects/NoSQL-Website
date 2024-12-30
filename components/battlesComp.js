const express = require('express');
const router = express.Router();
const session = require('./neo4jConnection');  

router.get('/', async (req, res) => {
  try {
    const result = await session.run('MATCH (b:Battle) RETURN b.name AS name, b.year AS year');
    const battles = result.records.map(record => ({
      name: record.get('name'),
      year: record.get('year')
    }));
    res.json(battles);
  } catch (error) {
    res.status(500).send('Error al obtener las batallas');
  }
});

module.exports = router;
