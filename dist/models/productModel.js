"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prodctSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destin: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    default: 0,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    default: 0,
    required: true
  }
});

const productModel = _mongoose.default.model('Product', prodctSchema);

var _default = productModel;
exports.default = _default;