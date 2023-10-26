import { ValidationContract } from '../validators/index.js';

import { Product } from '../models/index.js';
import { RepositoryProduct } from '../repositories/index.js';

export const getAll = (req, res) => {
  RepositoryProduct.get()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: 'It was not possible to get the products', error });
    });
};

export const getBySlug = (req, res) => {
  RepositoryProduct.getBySlug(req.params.slug)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json({ error }));
};

export const getById = (req, res) => {
  RepositoryProduct.getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json({ error }));
};

export const getByTag = (req, res) => {
  RepositoryProduct.getByTag(req.params.tag)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json(error));
};

export const post = (req, res) => {
  const validation = new ValidationContract();
  validation.hasMinLen(
    req.body.title,
    5,
    'It is necessary to have more then five characters'
  );

  if (!validation.isValid()) {
    res.status(400).json(validation.errors()).end();
    return;
  }

  RepositoryProduct.create(req.body)
    .then(() => {
      res.status(201).json({ message: 'Product has registered with success!' });
    })
    .catch((error) =>
      res.status(400).json({
        message: 'It was not possible to register the product',
        data: error,
      })
    );
};

export const put = (req, res) => {
  RepositoryProduct.update(req.params.id, req.body)
    .then(() =>
      res.status(201).json({ message: 'Product updated with success!' })
    )
    .catch((error) =>
      res.status(400).json({ message: 'Product cannot be updated!', error })
    );
};

export const del = (req, res) => {
  RepositoryProduct.remove(req.body.id)
    .then(() =>
      res.status(201).json({ message: 'Product removed with success!' })
    )
    .catch((error) =>
      res.status(400).json({ message: 'Product cannot be removed!', error })
    );
};
