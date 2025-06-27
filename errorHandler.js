const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  console.error('💥 Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;