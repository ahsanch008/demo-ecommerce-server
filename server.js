const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

const app = express();

connectDB();
// Update CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://urbanstore-ecommerce.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
  res.send('URBANStore!');
});
port= process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
