// StAuth10244: I Aish Patel, 000902820 and Hitarth Patel, 000897988 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [coffeeList, setCoffeeList] = useState([]);
  const [name, setName] = useState('');
  const [roastLevel, setRoastLevel] = useState('');
  const [origin, setOrigin] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

  const API_URL = 'http://localhost:3001/api';

  // Fetch coffee collection
  const fetchCoffee = async () => {
    try {
      const response = await axios.get(API_URL);
      setCoffeeList(response.data);
    } catch (error) {
      console.error('Error fetching coffee data:', error);
    }
  };

  // Add or update a coffee item
  const saveCoffee = async () => {
    try {
      if (editId) {
        await axios.put(API_URL + '/' + editId, {
          name,
          roast_level: roastLevel,
          origin,
          price: parseFloat(price),
        });
      } else {
        await axios.post(API_URL, {
          name,
          roast_level: roastLevel,
          origin,
          price: parseFloat(price),
        });
      }
      fetchCoffee();
      setName('');
      setRoastLevel('');
      setOrigin('');
      setPrice('');
      setEditId(null);
    } catch (error) {
      console.error('Error saving coffee:', error);
    }
  };

  // Set the coffee item to be edited
  const editCoffee = (item) => {
    setName(item.name);
    setRoastLevel(item.roast_level);
    setOrigin(item.origin);
    setPrice(item.price);
    setEditId(item.id);
  };

  // Delete a coffee item by ID
  const deleteCoffee = async (id) => {
    try {
      await axios.delete(API_URL + '/' + id);
      fetchCoffee();
    } catch (error) {
      console.error('Error deleting coffee:', error);
    }
  };

  // Delete the entire coffee collection
  const deleteAllCoffee = async () => {
    try {
      await axios.delete(API_URL);
      fetchCoffee();
    } catch (error) {
      console.error('Error deleting all coffee:', error);
    }
  };

  useEffect(() => {
    fetchCoffee();
  }, []);

  return (
    <div style={styles.imageContainer}>
      <div style={styles.imageContainerOverlay}>
      <div style={styles.container}>
      <h1 style={styles.title}>Coffee Inventory</h1>
      <div style={styles.form}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type='text'
          placeholder='Roast Level'
          value={roastLevel}
          onChange={(e) => setRoastLevel(e.target.value)}
          style={styles.input}
        />
        <input
          type='text'
          placeholder='Origin'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={styles.input}
        />
        <input
          type='number'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        <button onClick={saveCoffee} style={styles.button}>
          {editId ? 'Update Coffee' : 'Add Coffee'}
        </button>
        <button onClick={deleteAllCoffee} style={styles.deleteButton}>
          Delete All Coffee
        </button>
      </div>
      <ul style={styles.list}>
        {coffeeList.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <div style={styles.itemText}>
              {item.name} - {item.roast_level} - {item.origin} - ${item.price}
            </div>
            <div style={styles.buttonContainer}>
              <button onClick={() => editCoffee(item)} style={styles.editButton}>
                Edit
              </button>
              <button onClick={() => deleteCoffee(item.id)} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
    
    </div>
  );
}

// Styles
const styles = {
  imageContainer: {
    backgroundImage: 'url("/coffee.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', 
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  imageContainerOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: '#eee',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    flex: '1',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
};

export default App;
