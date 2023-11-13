import { Customer } from '../models';
import { NotFoundError } from '../utils/Errors/NotFoundError';

export const getById = async (id) => {
  const customer = await Customer.findById(id, { username: 1, email: 1 });
  if (!customer) throw new Error('Customer not found!');
  return customer;
};

export const getByEmail = async (email) => {
  const customer = await Customer.findOne({ email });
  return customer;
};

export const getByUsername = async (username) => {
  const customer = await Customer.findOne({ username });
  return customer;
};

export const authenticate = async (data) => {
  const customer = await Customer.findOne({
    email: data.email,
    password: data.password,
  });
  if (!customer) throw new NotFoundError('Email or password invalid');
  return customer;
};

export const create = async (data) => {
  const customerExist = await getByEmail(data.email);
  if (customerExist?.email) throw new Error('Customer already exist');

  const customer = new Customer(data);
  await customer.save();
  return customer;
};

export const deleteCustomer = async (id) => {
  await Customer.findByIdAndDelete(id);
};

export const updateCostumer = async (id, username) => {
  const customer = await getById(id);
  await customer.updateOne({ username });
};
