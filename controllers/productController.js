const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.createProduct = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  try {
    let newProduct = new Product({
      title,
      description,
      price,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
