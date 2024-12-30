const express = require('express');
const router = express.Router();
const session = require('./neo4jConnection');  

router.get('/', async (req, res) => {
  try {
    const result = await session.run('MATCH (t:Technology) RETURN t.name AS name');
    const technologies = result.records.map(record => ({
      name: record.get('name')
    }));
    res.json(technologies);
  } catch (error) {
    res.status(500).send('Error al obtener las tecnologías');
  }
});

module.exports = router;
