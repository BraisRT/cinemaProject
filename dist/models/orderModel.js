"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const shippingSchema = new _mongoose.default.Schema({
  address: {
    type: String,
    required: true
  }
});
const paymentSchema = new _mongoose.default.Schema({
  paymentMethod: {
    type: String,
    required: true
  }
});
const orderItemSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  product: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});
const orderSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});

const orderModel = _mongoose.default.model("Order", orderSchema);

var _default = orderModel;
exports.default = _default;