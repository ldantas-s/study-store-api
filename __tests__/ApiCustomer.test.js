import request from 'supertest';

import { RepositoryCustomer } from '../src/repositories/index.js';
import app from '../src/app.js';

import { dbConnect, dbDisconnect } from './__mocks__/MockMongoDB.js';

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

const deleteCustomerTest = async (email) => {
  const customer = await RepositoryCustomer.getByEmail(email);
  RepositoryCustomer.deleteCustomer(customer.id);
};

const requestApp = request(app);

test('should successful create a customer', async () => {
  const res = await requestApp
    .post('/v1/customers')
    .send({ username: 'test', email: 'test@contact.com', password: '1234567' });

  expect(res.status).toBe(201);
  expect(res.body).toMatchObject({ message: 'Customer created with success!' });
  await deleteCustomerTest('test@contact.com');
});

test('should return an error which is necessary more than 2 characters for username', async () => {
  const res = await requestApp
    .post('/v1/customers')
    .send({ username: 'te', email: 'test@contact.com', password: '1234567' });

  expect(res.status).toBe(404);
  expect(res.body).toMatchObject([
    { username: 'It is necessary to have more then 2 characters!' },
  ]);
});

test('should return an error which is necessary more than 6 characters for password', async () => {
  const res = await requestApp
    .post('/v1/customers')
    .send({ username: 'test', email: 'test@contact.com', password: '123456' });

  expect(res.status).toBe(404);
  expect(res.body).toMatchObject([
    { password: 'It is necessary to have more then 6 characters!' },
  ]);
});

test('should return an error which is necessary hava a valid format email', async () => {
  const res = await requestApp
    .post('/v1/customers')
    .send({ username: 'test', email: 'test@contact.c', password: '1234567' });

  expect(res.status).toBe(404);
  expect(res.body).toMatchObject([{ email: 'The email it is not valid!' }]);
});

test('should return an error when try to create a customer with a email existent', async () => {
  const res1 = await requestApp.post('/v1/customers').send({
    username: 'test',
    email: 'test@contact.com',
    password: '1234567',
  });
  const res2 = await requestApp.post('/v1/customers').send({
    username: 'test',
    email: 'test@contact.com',
    password: '1234567',
  });

  expect(res2.status).toBe(404);
  await deleteCustomerTest('test@contact.com');
});

test('should be able to update the username or the password', async () => {
  const creatingCustomer = await requestApp
    .post('/v1/customers')
    .send({ username: 'test', email: 'test@contact.com', password: '1234567' });
  const login = await requestApp
    .post('/v1/customers/login')
    .send({ email: 'test@contact.com', password: '1234567' });
  const updating = await requestApp
    .put('/v1/customers')
    .set('x-access-token', login.body.token || '')
    .send({ username: 'newUsername' });

  expect(updating.status).toBe(204);
  await deleteCustomerTest('test@contact.com');
});

test('should return the username and email of logged customer', async () => {
  await requestApp
    .post('/v1/customers')
    .send({ username: 'test', email: 'test@contact.com', password: '1234567' });
  const login = await requestApp
    .post('/v1/customers/login')
    .send({ email: 'test@contact.com', password: '1234567' });
  const getCustomerInfo = await requestApp
    .get('/v1/customers')
    .set('x-access-token', login.body.token || '');

  expect(getCustomerInfo.status).toBe(200);
  expect(getCustomerInfo.body).toMatchObject({
    customer: {
      username: 'test',
      email: 'test@contact.com',
    },
  });
  await deleteCustomerTest('test@contact.com');
});

test('should return an error when fail to make login', async () => {
  const login = await requestApp
    .post('/v1/customers/login')
    .send({ email: 'test@contact.com', password: '1234567' });

  expect(login.status).toBe(404);
});
test.todo('should return an error when fail to refresh the token');
