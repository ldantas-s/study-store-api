import mongoose from 'mongoose';

const Customer = mongoose.model('Customer');

export const getAll = () => Customer.find({}, 'username email');
export const getById = (id) => Customer.findById(id);

export const authenticate = (data) => {
  return Customer.findOne({ email: data.email, password: data.password });
};

export const create = (data) => {
  const customer = new Customer(data);

  return customer.save();
};
