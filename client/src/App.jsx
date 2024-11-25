import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      try {
        await axios.put(`http://localhost:5000/api/items/${editId}`, { name, description });
        fetchItems(); 
        setName(''); 
        setDescription('');
        setEditId(null); 
      } catch (error) {
        console.error('Error updating item:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:5000/api/items', { name, description });
        fetchItems(); 
        setName(''); 
        setDescription('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id); 
    setName(item.name); 
    setDescription(item.description); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems(); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>MERN CRUD Application</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', width: '200px' }}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: '10px', padding: '8px', width: '200px' }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 20px',
            background: editId ? 'orange' : 'blue',
            color: 'white',
            border: 'none',
          }}
        >
          {editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {/* List of Items */}
      <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px', margin: '0 auto' }}>
        {items.map((item) => (
          <li
            key={item._id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <strong>{item.name}</strong>: {item.description}
            </div>
            <div>
              <button
                onClick={() => handleEdit(item)}
                style={{
                  padding: '5px 10px',
                  background: 'orange',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                style={{
                  padding: '5px 10px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
