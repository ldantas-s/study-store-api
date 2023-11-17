import { Customer } from '../models/index.js';
import { ValidationContract } from '../validators/index.js';
import { RepositoryCustomer } from '../repositories/index.js';
import * as EmailService from '../services/emailService.js';
import * as AuthService from '../services/authService.js';
import { createEncryptValue } from '../utils/encryptValue.js';
import { BadRequestError } from '../utils/Errors/BadRequestError.js';

export const getCustomerData = async (req, res, next) => {
  /* 
  #swagger.tags = ['Customers']
  #swagger.security = [{
    "ApiKeyAuth": ''
  }]
  */
  try {
    const dataToken = AuthService.decodeToken(AuthService.getToken(req));
    const customer = await RepositoryCustomer.getById(dataToken.id);

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  /*
  #swagger.tags = ['Customers']
  #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          "type": "object",
          "properties": {
            "username": {
              "example": "test"
            },
            "email": {
              "example": "test@contact.com"
            },
            "password": {
              "type": "string",
              "example": "654321"
            }
          }
        }  
      },
    }
  }
  */
  const contract = new ValidationContract();

  contract.hasMinLen(req.body.username, 3, {
    username: 'It is necessary to have more then 2 characters!',
  });
  contract.isEmail(req.body.email, { email: 'The email it is not valid!' });
  contract.hasMinLen(req.body.password, 6, {
    password: 'It is necessary to have more then 6 characters!',
  });

  try {
    if (!contract.isValid()) {
      throw new BadRequestError(
        'Please, check the invalid fields value',
        contract.errors()
      );
    }
    await RepositoryCustomer.create({
      ...req.body,
      password: createEncryptValue(req.body.password),
      roles: ['user'],
    });
    // EmailService.send(
    //   { email: req.body.email, name: req.body.username },
    //   'Welcome to the JLG',
    //   process.env.EMAIL_TMPL.replace('{0}', req.body.username)
    // );
    res.status(201).json({ message: 'Customer created with success!' });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res) => {
  /*
  #swagger.tags = ['Customers']
  #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          "type": "object",
          "properties": {
            "username": {
              "example": "new_username"
            }
          }
        }  
      },
    }
  }
  */
  const dataToken = await AuthService.decodeToken(AuthService.getToken(req));
  try {
    await RepositoryCustomer.updateCostumer(dataToken.id, req.body.username);
    res.status(204).json({ message: 'Customer updated with success!' });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const login = async (req, res, next) => {
  /*
  #swagger.tags = ['Authentication']
  #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          "type": "object",
          "properties": {
            "email": {
              "example": "servo@contact.com"
            },
            "password": {
              "type": "string",
              "example": "654321"
            }
          }
        }  
      },
    }
  } 
  */
  try {
    const customer = await RepositoryCustomer.authenticate({
      ...req.body,
      password: createEncryptValue(req.body.password),
    });

    const token = AuthService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    });

    res.status(200).json({
      token,
      data: { email: customer.email, username: customer.username },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  /*
  #swagger.tags = ['Authentication']
  #swagger.security = [{
    "ApiKeyAuth": ''
  }]
  */
  try {
    const data = AuthService.decodeToken(AuthService.getToken(req));
    const customer = await RepositoryCustomer.getById(data.id);

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
  } catch (error) {
    next(error);
  }
};
