const db = require('../config/db_connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fetch all users
const getUsers = (req, res) => {
    db.all('SELECT * FROM users', (err, users) => {
      if (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
      } else {
        res.status(200).json({ users });
      }
    });
  };

// Create a new user
const createUser = (req, res) => {
    const { username, password, role } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password', error: err.message });
        }
        db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], function(err) {
            if (err) {
                res.status(500).json({ message: 'Error creating user', error: err.message });
            } else {
                res.status(201).json({ message: 'User created successfully', userId: this.lastID });
            }
        });
    });
};

// Update a user's role
const updateUser = (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    db.run('UPDATE users SET role = ? WHERE id = ?', [role, id], function(err) {
        if (err) {
            res.status(500).json({ message: 'Error updating user', error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User role updated successfully' });
        }
    });
};

// Login a user
const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res
          .status(500)
          .json({
            message: "Internal server error during password comparison",
          });
      }
      if (!result) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Generate a token based on the user's role
      const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send the token in the response
      res.status(200).json({ token });
    });
  });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    loginUser
};
