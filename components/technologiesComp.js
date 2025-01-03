/**
 * @module alliancesComp
 * @description This module defines a route for fetching data about technologies from a Neo4j database. 
 * It uses the Express framework and communicates with the Neo4j database 
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
    // executeQuery a Cypher query in Neo4j to match technologies.
    const result = await session.executeQuery(`
      MATCH (t:Technology) RETURN t.name AS name
    `, {},
    { database: 'neo4j' });

    const technologies = result.records.map(record => ({
      name: record.get('name')
    }));

    // Response with the JSON representation of the retrieved data.
    res.json(technologies);

  } catch (error) {
    res.status(500).send('Error obtaining technologies');
  }
});

// Export the router to make it available to other modules.
module.exports = router;
