/**
 * @module alliancesComp
 * @description This module defines a route for fetching data about countries and their alliances 
 * from a Neo4j database. It uses the Express framework and communicates with the Neo4j database 
 * to retrieve information on how countries are related to alliances.
 * 
 * @requires express - Framework for building web applications in Node.js.
 * @requires express.Router - Express Router for defining modular route handlers.
 * @requires ./neo4jConnection - Establishes a connection to the Neo4j database.
 */

const express = require('express');
const router = express.Router();
const session = require('./neo4jConnection');  

/**
 * @param {Object} req - The HTTP request object (unused).
 * @param {Object} res - The HTTP response object used to send back the retrieved data or an error message.
 */
router.get('/', async (req, res) => {
  try {
    // Run a Cypher query in Neo4j to match countries and their alliances.
    const result = await session.run(`
      MATCH (c:Country)-[:BELONGS_TO]->(a:Aliance)
      RETURN c.name AS country, a.name AS alliance
    `);

    const alliances = result.records.map(record => ({
      country: record.get('country'),
      alliance: record.get('alliance')
    }));

    // Response with the JSON representation of the retrieved data.
    res.json(alliances);

  } catch (error) {
    res.status(500).send('Error al obtener las alianzas');
  }
});

// Export the router to make it available to other modules.
module.exports = router;
