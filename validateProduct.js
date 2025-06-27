const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "name"' });
  }
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "description"' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: '"price" must be a positive number' });
  }
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "category"' });
  }
  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: '"inStock" must be a boolean' });
  }

  next();
};

module.exports = validateProduct;