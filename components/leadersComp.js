const express = require('express');
const router = express.Router();
const session = require('./neo4jConnection');  

router.get('/leaders', async (req, res) => {
    try {
      const result = await session.run('MATCH (l:Leader) RETURN l.name, l.birth_year');
  
      const leaders = result.records.map(record => ({
        name: record.get('l.name'),
        birthYear: record.get('l.birth_year')
      }));
  
      res.json(leaders);
    } catch (error) { res.status(500).send('Error al obtener los líderes'); }
});

module.exports = router;
