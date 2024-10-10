const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.SUPABASE_JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err.message); // Log the error
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
