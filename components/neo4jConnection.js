/**
 * @module neo4jConnection
 * @description This module establishes a connection to a Neo4j database using the Neo4j JavaScript driver.
 * It creates a session that can be used to run Cypher queries throughout the application.
 * 
 * @requires neo4j - Official Neo4j JavaScript driver for connecting to a Neo4j database.
 * 
 * @see {@link https://neo4j.com/docs/javascript-manual/} - Neo4j JavaScript Driver Documentation.
 */

const neo4j = require('neo4j-driver'); // Import the official Neo4j driver for JavaScript.
require('dotenv').config()

/**
 * Create a Neo4j driver instance.
 * 
 * @description The driver connects to the Neo4j database instance using the Bolt protocol.
 * - `neo4j+s://<tu-instancia>.databases.neo4j.io`: The database's URI.
 * - `neo4j.auth.basic('neo4j', 'password')`: Authentication using the database's username and password.
 */
const driver = neo4j.driver(
  process.env.NEO4J_URL, 
  neo4j.auth.basic(process.env.USER, process.env.PASSWORD) 
);

/**
 * Export the session instance.
 */
module.exports = driver;

