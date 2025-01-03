/**
 * @module alliancesComp
 * @description This module defines a route for fetching data about countries and their battles 
 * from a Neo4j database. It uses the Express framework and communicates with the Neo4j database 
 * to retrieve information on how countries are related to alliances.
 * 
 * @requires express - Framework for building web applications in Node.js.
 * @requires express.Router - Express Router for defining modular route handlers.
 * @requires ./neo4jConnection - Establishes a connection to the Neo4j database.
 */

const express = require('express');
const router = express.Router();
const { getDriver } = require('./neo4jConfigComp');   

/**
 * @param {Object} req - The HTTP request object (unused).
 * @param {Object} res - The HTTP response object used to send back the retrieved data or an error message.
 */
router.get('/', async (req, res) => {
  try {
    const driver = getDriver();
    const session = driver.session();

    // executeQuery a Cypher query in Neo4j to match battles.
    const result = await session.run(`
      MATCH (b:Battle) RETURN b.name AS name, b.year AS year`,
      {},
      { database: 'neo4j' });

    const battles = result.records.map(record => ({
      name: record.get('name'),
      year: record.get('year')
    }));

    await session.close();

    // Response with the JSON representation of the retrieved data.
    res.json(battles);

  } catch (error) {
    res.status(500).send('Error al obtener las batallas');
  }
});

// Export the router to make it available to other modules.
module.exports = router;
