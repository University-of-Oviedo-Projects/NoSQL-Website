async function saveConfig(event) {
    event.preventDefault();
    console.log('Guardando configuración...');
    
    const url = document.getElementById('neo4j-url').value;
    const user = document.getElementById('neo4j-user').value;
    const password = document.getElementById('neo4j-password').value;

    const config = {
        url: url,
        user: user,
        password: password
    };

    try {
        const response = await fetch('https://nosql-website.onrender.com/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('message').textContent = result.message;
            document.getElementById('message').style.display = "block";
            document.getElementById('db-config-form').style.display = "none";
            window.location.href = 'html/home.html';
        } else {
            document.getElementById('message').textContent = "Hubo un error al guardar la configuración.";
            document.getElementById('message').style.display = "block";
        }
    } catch (error) {
        console.error('Error al guardar la configuración:', error);
        document.getElementById('message').textContent = "Error de conexión con el servidor.";
        document.getElementById('message').style.display = "block";
    }
}

document.getElementById('db-config-form').addEventListener('submit', saveConfig);