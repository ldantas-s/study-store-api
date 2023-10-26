import { Customer } from '../models/index.js';
import { ValidationContract } from '../validators/index.js';
import { RepositoryCustomer } from '../repositories/index.js';
import * as EmailService from '../services/emailService.js';
import * as AuthService from '../services/authService.js';
import { createEncryptValue } from '../utils.js';

export const getAll = (req, res) => {
  RepositoryCustomer.getAll()
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json({ error }));
};

export const create = (req, res) => {
  const contract = new ValidationContract();

  contract.hasMinLen(
    req.body.username,
    3,
    'It is necessary to have more then 3 characters!'
  );
  contract.isEmail(req.body.email, 'The email it is not valid!');
  contract.hasMinLen(
    req.body.password,
    6,
    'It is necessary to have more then 6 characters!'
  );
  if (!contract.isValid()) {
    res.status(400).json(contract.errors()).end();
    return;
  }

  RepositoryCustomer.create({
    ...req.body,
    password: createEncryptValue(req.body.password),
    roles: ['user'],
  })
    .then(() => {
      EmailService.send(
        { email: req.body.email, name: req.body.username },
        'Welcome to the JLG',
        process.env.EMAIL_TMPL.replace('{0}', req.body.username)
      );

      res.status(201).json({ message: 'Customer created with success!' });
    })
    .catch((error) => res.status(400).json({ error }));
};

export const login = (req, res) => {
  RepositoryCustomer.authenticate({
    ...req.body,
    password: createEncryptValue(req.body.password),
  })
    .then(async (customer) => {
      if (!customer) {
        res.status(404).json({ message: 'Email or password invalid!' });
        return;
      }

      const token = await AuthService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles,
      });

      res.status(200).json({
        token,
        data: { email: customer.email, username: customer.username },
      });
    })
    .catch((error) => res.statu(400).json({ error }));
};

export const refreshToken = async (req, res) => {
  const data = await AuthService.decodeToken(AuthService.getToken(req));

  RepositoryCustomer.getById(data.id)
    .then(async (customer) => {
      if (!customer) {
        res.status(404).json({ message: 'Email or password invalid!' });
        return;
      }

      const token = await AuthService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles,
      });

      res.status(200).json({
        token,
        data: { email: customer.email, username: customer.username },
      });
    })
    .catch((error) => res.statu(400).json({ error }));
};
