const { v4: uuidv4 } = require('uuid');
let products = require('../data/products');
const asyncWrapper = require('../utils/asyncWrapper');
const { NotFoundError } = require('../utils/errors');

const getAllProducts = asyncWrapper(async (req, res) => {
  let result = products;

  if (req.query.search) {
    const keyword = req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(keyword));
  }

  if (req.query.category) {
    result = result.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({ total: result.length, page, limit, data: paginated });
});

const getProductById = asyncWrapper(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError();
  res.json(product);
});

const createProduct = asyncWrapper(async (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

const updateProduct = asyncWrapper(async (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError();

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError();

  products.splice(index, 1);
  res.status(204).send();
});

const getProductStats = asyncWrapper(async (req, res) => {
  const stats = {};
  for (let p of products) {
    const cat = p.category.toLowerCase();
    stats[cat] = (stats[cat] || 0) + 1;
  }
  res.json({ total: products.length, categories: stats });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
};