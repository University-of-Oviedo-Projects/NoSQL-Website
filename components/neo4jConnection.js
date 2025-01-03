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

/**
 * Create a Neo4j driver instance.
 * 
 * @description The driver connects to the Neo4j database instance using the Bolt protocol.
 * - `bolt://localhost:XXXX`: The database's URI. Replace `XXXX` with the appropriate port.
 * - `neo4j.auth.basic('neo4j', 'password')`: Authentication using the database's username and password.
 */
const driver = neo4j.driver(
  'bolt://localhost:XXXX', // Replace XXXX with the correct Neo4j port (default: 7687).
  neo4j.auth.basic('neo4j', 'password') // Replace with your database username and password.
);

/**
 * Create a session instance for interacting with the database.
 * 
 * @description A session is used to run Cypher queries against the Neo4j database.
 * 
 * @see {@link https://neo4j.com/docs/javascript-manual/current/session-api/}
 */
const session = driver.session();

/**
 * Export the session instance.
 */
module.exports = session;

