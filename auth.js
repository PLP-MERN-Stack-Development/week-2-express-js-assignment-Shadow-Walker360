const API_KEY = 'supersecretkey123';

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
  }
  next();
};

module.exports = authenticate;