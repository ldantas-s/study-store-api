'use strict';
import jwt from 'jsonwebtoken';

export const generateToken = async (data) => {
  return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
};

export const decodeToken = async (token) => {
  const data = await jwt.verify(token, process.env.SALT_KEY);
  return data;
};

export const getToken = (req) => {
  return req.body.token || req.query.token || req.headers['x-access-token'];
};

export const authorize = (req, res, next) => {
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
