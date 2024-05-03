# Electronic Shelf Label System Backend

## Overview

This project is the backend for an Electronic Shelf Label (ESL) system designed to manage and update electronic price tags in multiple store locations in real-time. It features a robust API built with Node.js and Express, and it integrates with a MySQL database for persistent storage of product, price, and user data.

## Features

- **Real-Time Price Updates**: Update price tags on electronic labels in various store locations from a centralized admin panel.
- **Bulk Updates via CSV Upload**: Admins can upload CSV files to update prices in bulk for multiple products across multiple locations.
- **User Management**: Manage user roles and permissions to control access to different parts of the application.
- **Product Management**: CRUD operations for managing product information.

## Tech Stack

- **Frontend**: React, Next.js (handled separately)
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Other Tools**: JWT for authentication, bcrypt for password hashing, multer for handling file uploads, and csv-parser for processing CSV files.

## Getting Started

### Prerequisites

- Node.js (v14.x or later recommended)
- MySQL (v8.0 or later recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourgithubusername/electronic-shelf-label-system.git
   cd electronic-shelf-label-system
   
2. **Instal Dependencies**

   ```bash
   npm install

3. **Set Up Enviroment Variables**

   Create a new file named .env, and fill in your database credentials and other configuration settings.

4. **Database Setup**

   Run the SQL scripts located in the database folder to set up your database schemas.
   ```bash
   node services/sqliteService.js

### Running the Application

1. **Start the Server**

   ```bash
   npm start

2. **For development, you can use:**

    ```bash
    npm run dev
  
  This will start the server with nodemon, which will watch for changes and automatically restart the server.

### Usage
-

### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes, or open an issue to suggest improvements.

### License
ITESM License

### Contact
For support, please email a01721251@tec.mx or open an issue on this repository.
