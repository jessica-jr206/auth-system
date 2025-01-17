const protectAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); 
  } else {
    return res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protectAdmin };
