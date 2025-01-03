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
const { getDriver } = require('./neo4jConfigComp');   

/**
 * @param {Object} req - The HTTP request object (unused).
 * @param {Object} res - The HTTP response object used to send back the retrieved data or an error message.
 */
router.get('/', async (req, res) => {
  try {
    const driver = getDriver();
    const session = driver.session();

    const result = await session.run(`
      MATCH (c:Country)-[:BELONGS_TO]->(a:Alliance)
      RETURN c.name AS country, a.name AS alliance
    `);

    const alliances = result.records.map(record => ({
      country: record.get('country'),
      alliance: record.get('alliance')
    }));

    await session.close();

    // Response with the JSON representation of the retrieved data.
    res.json(alliances);

  } catch (error) {
    res.status(500).send('Error obtaining alliances');
  }
});

// Export the router to make it available to other modules.
module.exports = router;
