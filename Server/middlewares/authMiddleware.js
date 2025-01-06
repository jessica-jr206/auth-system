const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const usersDataPath = path.join(__dirname, '../data/users.json');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'));
      req.user = users.find((user) => user.id === decoded.id);
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
