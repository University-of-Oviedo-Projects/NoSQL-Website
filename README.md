# World War II NoSQL Website

Welcome to the World War II NoSQL Website! This project is a comprehensive web application that provides detailed information about World War II, including key nations, leaders, battles, technologies, and alliances. The website is built using HTML, CSS, JavaScript, and Node.js, with data stored in a Neo4j NoSQL database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Countries**: Explore the countries that participated in World War II, including the Axis and Allied powers.
- **Leaders**: Learn about the influential figures who led the nations during the war.
- **Battles**: Discover the significant battles that determined the outcome of the war.
- **Technologies**: Explore the groundbreaking technologies developed during World War II.
- **Alliances**: Understand the powerful alliances formed during the war.

## Technologies Used

- **Frontend**: HTML, CSS, Bootstrap
- **Backend**: Node.js
- **Database**: Neo4j
- **Other**: JavaScript, JQuery

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/NoSQL-Website.git
    cd NoSQL-Website
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up Neo4j**:
    - Ensure you have Neo4j installed and running.

    - Update the connection details in :
      ```javascript
      const driver = neo4j.driver(
        'bolt://localhost:XXXX',  
        neo4j.auth.basic('neo4j', 'password')  
      );
      ```

4. **Start the server**:
    ```sh
    node app.js
    ```

## Usage
- Navigate through the website using the navigation bar.
- Click on the different sections (Countries, Leaders, Battles, Technologies, Alliances) to explore detailed information.
- The data is dynamically fetched from the Neo4j database and displayed on the respective pages.


## License
This project is licensed under the MIT License. See the  file for details.
