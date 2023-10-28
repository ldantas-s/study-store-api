import { ValidationContract } from '../validators/index.js';

import { Order } from '../models/index.js';
import { RepositoryOrder } from '../repositories/index.js';
import { randomID } from '../utils.js';
import * as AuthService from '../services/authService.js';

export const getAll = (req, res) =>
  /*
  #swagger.tags = ['Orders']
  #swagger.security = [{
    "ApiKeyAuth": ''
  }]*/
  RepositoryOrder.getAll()
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json({ error }));

export const create = async (req, res) => {
  /*
  #swagger.tags = ['Orders']
  #swagger.security = [{
    "ApiKeyAuth": ''
  }]*/
  const data = await AuthService.decodeToken(AuthService.getToken(req));

  RepositoryOrder.create({
    customer: data.id,
    number: randomID(6),
    items: req.body.items,
  })
    .then(() =>
      res.status(201).json({ message: 'Order created with success!' })
    )
    .catch((error) => res.status(400).json({ error }));
};
