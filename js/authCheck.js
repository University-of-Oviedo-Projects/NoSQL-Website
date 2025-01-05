async function checkConnection() {
    try {
        const response = await fetch('http://localhost:3000/config', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  
        });

        if (!response.ok) {
            console.log(`Response not OK: ${response.status}`);
            console.error('Unexpected error:', await response.json());
            window.location.href = '/';
        } else {
            const data = await response.json();
            console.log('Response Data:', data);
        }

    } catch (error) {
        console.error('Error when connecting:', error);
        window.location.href = '/'; 
    }
}


document.addEventListener('DOMContentLoaded', checkConnection);
