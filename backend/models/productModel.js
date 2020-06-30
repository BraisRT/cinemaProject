import mongoose from 'mongoose';



const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  destin: { type: String, required: true },
  seats: { type: Number, default: 0, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model('Product', prodctSchema);

export default productModel;
