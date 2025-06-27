const { v4: uuidv4 } = require('uuid');

let products = [
  {
    id: uuidv4(),
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    price: 29.99,
    category: "electronics",
    inStock: true
  },
  {
    id: uuidv4(),
    name: "Yoga Mat",
    description: "Eco-friendly yoga mat",
    price: 19.99,
    category: "fitness",
    inStock: true
  }
];

module.exports = products;