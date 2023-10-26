import mongoose from 'mongoose';

const Order = mongoose.model('Order');

export const getAll = () =>
  Order.find({}, 'number status')
    .populate('customer', 'username email')
    .populate('items.product', 'slug title price quanity');

export const create = (data) => {
  const order = new Order(data);
  return order.save();
};
