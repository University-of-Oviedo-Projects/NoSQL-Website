const express = require('express');
const neo4j = require('neo4j-driver');
const router = express.Router();

let driver = null;
router.use(express.json());

router.post('/', (req, res) => {
    const { url, user, password } = req.body;

    if (!url || !user || !password) {
        return res.status(400).json({ message: 'Por favor, ingresa todos los datos de configuración.' });
    }

    try {
        driver = neo4j.driver(
            url,
            neo4j.auth.basic(user, password)
        );

        res.status(200).json({ message: 'Configuración de Neo4j exitosa.' });
    } catch (err) {
        console.error('Error en la configuración de Neo4j:', err);
        res.status(500).json({ message: 'Error al intentar conectar a Neo4j.' });
    }
});

router.get('/config', (req, res) => {
    if (req.session.neo4jConfig) {
        return res.json({ message: 'Credentials already established' });
    } else {
        return res.status(400).json({ message: 'Neo4j not settled.' });
    }
});

function getDriver() {
    return driver;
}

module.exports = { router, getDriver };