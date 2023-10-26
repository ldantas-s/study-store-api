import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  // it's necessary to study aws to implement this feature
  // image: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
});

export const Product = mongoose.model('Product', productSchema);
