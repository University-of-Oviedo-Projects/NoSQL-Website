async function checkConnection() {
    try {
        const response = await fetch('https://nosql-website.onrender.com/config', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  
        });

        if (!response.ok) {
            console.log(`Response not OK: ${response.status}`);
            console.error('Unexpected error:', await response.json());
            window.location.href = 'https://github.com/adrianmfuentes/NoSQL-Website/';
        } else {
            const data = await response.json();
            console.log('Response Data:', data);
        }

    } catch (error) {
        console.error('Error when connecting:', error);
        window.location.href = 'https://github.com/adrianmfuentes/NoSQL-Website/'; 
    }
}


document.addEventListener('DOMContentLoaded', checkConnection);
