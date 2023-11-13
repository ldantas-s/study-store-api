import { Product } from '../models';

export const get = () => Product.find({ active: true }, 'title price slug');
export const getBySlug = (slug) =>
  Product.findOne({ slug: slug, active: true }, 'title price tags description');
export const getById = (id) =>
  Product.findById(id, 'title price tags description');
export const getByTag = (tag) =>
  Product.find({
    tags: tag,
    active: true,
  });
export const create = (data) => {
  const product = new Product();
  product.title = data.title;
  product.price = data.price;
  product.slug = data.slug;
  product.description = data.description;
  product.tags = data.tags;

  return product.save();
};
export const update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug,
    },
  });
};
export const remove = (id) => Product.findOneAndRemove(id);
