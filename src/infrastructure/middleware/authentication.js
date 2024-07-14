const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Authentication token required' });
  }
  try {
    const decoded = jwt.verify(token, config.JWT.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Error: ", error)
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
