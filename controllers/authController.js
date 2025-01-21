const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = (req, res) => {
  const { username, password, role } = req.body;
  const query = 'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, password, role], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'User registered successfully!' });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  
  // Validasi input username dan password
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).send('Invalid credentials');
    }
    const user = result[0];
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
  });
};

module.exports = { register, login };
