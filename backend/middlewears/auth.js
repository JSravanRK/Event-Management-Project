const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

exports.verifyToken = (req, res, next) => {
 const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now you can access req.user.role etc
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin Only' });
  next();
};
