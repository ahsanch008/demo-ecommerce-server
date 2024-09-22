const Product = require('../models/Product');

exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  };
  
exports.getProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10, category, search } = req.query;
      const query = {};
      if (category) query.category = category;
      if (search) query.$text = { $search: search };
  
      const products = await Product.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Product.countDocuments(query);
  
      res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  };