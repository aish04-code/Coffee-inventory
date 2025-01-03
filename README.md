﻿# Coffee-inventory
**Overview**
The Coffee Inventory Manager is a full-stack web application designed to manage a coffee inventory database. Users can add, edit, delete, and view coffee items through a React-based frontend and an Express.js backend connected to an SQLite database.

**Features**
Frontend:
Interactive React UI for coffee inventory management​
Add, update, or delete coffee items dynamically​
User-friendly interface styled with custom CSS​

Backend:
Express.js API for handling CRUD operations​
SQLite database initialized with sample data for demonstration​

Key Functionalities:
Add new coffee items with attributes: name, roast level, origin, and price.
Edit existing coffee items.
Delete individual items or the entire inventory.
Fetch and display the coffee collection in real-time.

**Technologies Used**
Frontend
React
Axios
CSS for styling​
​

Backend
Express.js
SQLite
CORS

**Installation**
Prerequisites
Node.js installed on your machine.
Steps
Backend
1.Navigate to the backend folder:
cd backend
2.Install dependencies:
npm install
3.Start the server:
node server.js
The server will be running at http://localhost:3001.

Frontend
1.Navigate to the frontend folder:
cd frontend
2.Install dependencies:
npm install
3.Start the development server:
npm start
Access the application at http://localhost:3000.

**Usage**
Start the backend server.
Launch the frontend.
Add or manage coffee inventory through the intuitive UI.
View updates in real-time as actions are performed.

**API Endpoints**
GET /api: Retrieve all coffee items.
POST /api: Add a new coffee item.
PUT /api/:id: Update a specific coffee item.
DELETE /api/:id: Delete a specific coffee item.
DELETE /api: Delete the entire inventory
