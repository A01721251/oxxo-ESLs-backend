const db = require('../config/db_connection');
const jwt = require('jsonwebtoken');

// Fetch all users
const getUsers = async (req, res) => {
    try {
        const [users] = await db.run('SELECT id, name, role FROM users');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { name, password, role } = req.body;  // Password should be hashed in a real application
    try {
        const result = await db.run('INSERT INTO users (name, password, role) VALUES (?, ?, ?)', [name, password, role]);
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Optional: Update a user's role
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const result = await db.run('UPDATE users SET role = ? WHERE id = ?', [role, id]);
        if (result.affectedRows) {
            res.status(200).json({ message: 'User role updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser
};
