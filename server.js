const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger/swaggerOptions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const logger = require('./middleware/logger');
const productRoutes = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/products', productRoutes);
app.get('/', (req, res) => res.send('Hello World 🚀'));

// Error handler
app.use(errorHandler);

// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));