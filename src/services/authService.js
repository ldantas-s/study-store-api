'use strict';
import jwt from 'jsonwebtoken';
import { TokenError } from '../utils/Errors/TokenError.js';

export const generateToken = (data) => {
  return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
};

export const decodeToken = (token) => {
  return jwt.verify(token, process.env.SALT_KEY);
};

export const getToken = (req) => {
  const token = req.headers['x-access-token'] || '';
  if (!token) throw new TokenError('Restrict Access!');
  return token;
};

export const authorize = (req, res, next) => {
  const token = getToken(req);

  jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
    if (error) next(new TokenError('Invalid Token'));

    next();
  });
};

export const isAdmin = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    res.status(401).json({ message: 'Restrict Access!' });
    return;
  }

  jwt.verify(token, process.env.SALT_KEY, (error, decoded) => {
    if (error) {
      res.status(401).json({ message: 'Invalid Token' });
      return;
    }

    const hasAdminRole = decoded.roles?.includes('admin');

    if (!hasAdminRole) {
      res.status(403).json({ message: 'Allowed only for admins!' });
      return;
    }

    next();
  });
};
