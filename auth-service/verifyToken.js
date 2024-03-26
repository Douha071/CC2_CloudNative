const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not provided' });

  jwt.verify(token, 'auth-service', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });

    req.user = decoded.user;
    next();
  });
}

module.exports = verifyToken;
