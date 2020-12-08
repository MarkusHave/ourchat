const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// Verify token middleware
const verifyToken = (req, res, next) => {
  // Get header
  const bearerHeader = req.headers['authorization'];

  // Check is header is valid
  if (typeof bearerHeader !== 'undefined') {
    // Get token from header
    const token = bearerHeader.split(' ')[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = { verifyToken };
