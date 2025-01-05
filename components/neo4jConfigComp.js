const express = require('express');
const neo4j = require('neo4j-driver');
const router = express.Router();
const fs = require('fs'); 
const path = require('path');

let driver = null;
router.use(express.json());

const configFilePath = path.join(__dirname, 'neo4jConfig.json');

router.post('/', (req, res) => {
    const { url, user, password } = req.body;

    if (!url || !user || !password) {
        return res.status(400).json({ message: 'Please, enter all the required data.' });
    }

    try {
        driver = neo4j.driver(
            url,
            neo4j.auth.basic(user, password)
        );

        const config = { url, user, password };

        // Save the Neo4j credentials in the session
        fs.writeFile(configFilePath, JSON.stringify(config, null, 2), (err) => {
            if (err) {
              console.error('Error al guardar la configuración:', err);
              return res.status(500).json({ message: 'Error saving the configuration.' });
            }
        });

        res.json({ message: 'Neo4j credentials established.' });
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({ message: 'Error connecting Neo4j.' });
    }
});

router.get('/', (req, res) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(400).json({ message: 'Neo4j not settled.' });
        }
        
        let testDriver = null;
        let session = null;
        
        try {
            const config = JSON.parse(data);

            // Try to establish a connection with the Neo4j database
            testDriver = neo4j.driver(
                config.url,
                neo4j.auth.basic(config.user, config.password)
            );

            // Make a test query to check the connection
            session = testDriver.session();

            session.run('RETURN 1')
                .then(() => {
                    // If the connection is successful, the credentials are valid
                    res.json({ message: 'Credentials already established', config });
                    session.close();
                    testDriver.close();
                })
                .catch((err) => {
                    // If the connection fails, the credentials are invalid
                    console.error('Neo4j connection failed:', err.message);
                    res.status(401).json({ message: 'Invalid Neo4j credentials.' });
                    session.close();
                    testDriver.close();
                });
                
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError.message);
            return res.status(400).json({ message: 'Invalid configuration format.' });
        } 
    });
});

function getDriver() {
    return driver;
}

module.exports = { router, getDriver };