// StAuth10244: I Aish Patel, 000902820 and Hitarth Patel, 000897988 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const file = 'coffee_inventory.db';
const db = new sqlite3.Database(file);

// Initialize the database
db.serialize(function () {
  // Drop the table if it exists
  db.run('DROP TABLE IF EXISTS Coffee');

  // Create the Coffee table
  db.run('CREATE TABLE Coffee (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, roast_level TEXT, origin TEXT, price REAL)');

  // Insert data
  const stmt = db.prepare('INSERT INTO Coffee (name, roast_level, origin, price) VALUES (?, ?, ?, ?)');
  stmt.run('Ethiopian Yirgacheffe', 'Light', 'Ethiopia', 12.99);
  stmt.run('Colombian Supremo', 'Medium', 'Colombia', 10.99);
  stmt.run('Sumatra Mandheling', 'Dark', 'Indonesia', 14.99);
  stmt.finalize();

  console.log('Database initialized with sample data');
});

// Routes for managing the coffee inventory

// GET: Retrieve the entire collection
app.get('/api', (req, res) => {
  db.all('SELECT * FROM Coffee', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST: Add a new coffee item
app.post('/api', (req, res) => {
  const { name, roast_level, origin, price } = req.body;
  db.run('INSERT INTO Coffee (name, roast_level, origin, price) VALUES (?, ?, ?, ?)', [name, roast_level, origin, price], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: 'CREATE ENTRY SUCCESSFUL', id: this.lastID });
    }
  });
});

// PUT: Update an item by ID
app.put('/api/:id', (req, res) => {
  const { id } = req.params;
  const { name, roast_level, origin, price } = req.body;
  db.run('UPDATE Coffee SET name = ?, roast_level = ?, origin = ?, price = ? WHERE id = ?', [name, roast_level, origin, price, id], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: 'UPDATE ITEM SUCCESSFUL' });
    }
  });
});

// DELETE: Delete an item by ID
app.delete('/api/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Coffee WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: 'DELETE ITEM SUCCESSFUL' });
    }
  });
});

// DELETE: Delete the entire collection
app.delete('/api', (req, res) => {
  db.run('DELETE FROM Coffee', function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ status: 'DELETE COLLECTION SUCCESSFUL' });
    }
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:3001');
});

// Close the database connection when the app exits
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});
