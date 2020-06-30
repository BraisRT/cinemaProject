"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? {
    category: req.query.category
  } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
    price: 1
  } : {
    price: -1
  } : {
    _id: -1
  };
  const products = await _productModel.default.find({ ...category,
    ...searchKeyword
  }).sort(sortOrder);
  res.send(products);
});
router.get('/:id', async (req, res) => {
  const product = await _productModel.default.findOne({
    _id: req.params.id
  });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: 'Product Not Found.'
    });
  }
});
router.put('/:id', _util.isAuth, _util.isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.origin = req.body.origin;
    product.destin = req.body.destin;
    product.seats = req.body.seats;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    const updatedProduct = await product.save();

    if (updatedProduct) {
      return res.status(200).send({
        message: 'Product Updated',
        data: updatedProduct
      });
    }
  }

  return res.status(500).send({
    message: ' Error in Updating Product.'
  });
});
router.post('/', async (req, res) => {
  const product = new _productModel.default({
    name: req.body.name,
    price: req.body.price,
    origin: req.body.origin,
    destin: req.body.destin,
    category: req.body.category,
    countInStock: req.body.countInStock,
    seats: req.body.seats
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).send({
      message: 'New Route Bus Created',
      data: newProduct
    });
  }

  return res.status(500).send({
    message: ' Error in Creating Route Bus.'
  });
});
router.delete('/:id', _util.isAuth, _util.isAdmin, async (req, res) => {
  const deletedProduct = await _productModel.default.findById(req.params.id);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({
      message: 'Product Deleted'
    });
  } else {
    res.send('Error in Deletion.');
  }
});
var _default = router;
exports.default = _default;