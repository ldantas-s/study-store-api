import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      required: true,
      enum: ['user', 'admin'],
    },
  ],
});

export const Customer = mongoose.model('Customer', customerSchema);
