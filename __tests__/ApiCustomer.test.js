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

describe('GET - /customers', () => {
  beforeAll(async () => {
    await requestApp.post('/v1/customers').send({
      username: 'test',
      email: 'test@contact.com',
      password: '1234567',
    });
  });
  afterAll(async () => {
    await deleteCustomerTest('test@contact.com');
  });

  test('should return the username and email of logged customer', async () => {
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
  });

  test('should return a restrict access when it try to access without token', async () => {
    const getCustomerInfo = await requestApp
      .get('/v1/customers')
      .set('x-access-token', '');

    expect(getCustomerInfo.body.message).toBe('Restrict Access!');
    expect(getCustomerInfo.status).toBe(401);
  });
});

describe('POST - /customers', () => {
  afterAll(async () => {
    await deleteCustomerTest('test@contact.com');
  });

  test('should successful create a customer', async () => {
    const res = await requestApp.post('/v1/customers').send({
      username: 'test',
      email: 'test@contact.com',
      password: '1234567',
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: 'Customer created with success!',
    });
  });

  test('should return an error which is necessary more than 2 characters for username', async () => {
    const res = await requestApp
      .post('/v1/customers')
      .send({ username: 'te', email: 'test@contact.com', password: '1234567' });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      body: [{ username: 'It is necessary to have more then 2 characters!' }],
      type: 'bad_request',
      message: 'Please, check the invalid fields value',
    });
  });

  test('should return an error which is necessary more than 6 characters for password', async () => {
    const res = await requestApp.post('/v1/customers').send({
      username: 'test',
      email: 'test@contact.com',
      password: '123456',
    });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      body: [{ password: 'It is necessary to have more then 6 characters!' }],
      type: 'bad_request',
      message: 'Please, check the invalid fields value',
    });
  });

  test('should return an error which is necessary hava a valid format email', async () => {
    const res = await requestApp
      .post('/v1/customers')
      .send({ username: 'test', email: 'test@contact.c', password: '1234567' });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      body: [{ email: 'The email it is not valid!' }],
      type: 'bad_request',
      message: 'Please, check the invalid fields value',
    });
  });

  test('should return an error for both password and email invalid', async () => {
    const res = await requestApp.post('/v1/customers').send({
      username: 'test',
      email: 'test@contact.c',
      password: '123456',
    });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      body: [
        { email: 'The email it is not valid!' },
        { password: 'It is necessary to have more then 6 characters!' },
      ],
      type: 'bad_request',
      message: 'Please, check the invalid fields value',
    });
  });

  test('should return an error when try to create a customer with a email existent', async () => {
    const res2 = await requestApp.post('/v1/customers').send({
      username: 'test',
      email: 'test@contact.com',
      password: '1234567',
    });

    expect(res2.status).toBe(409);
    expect(res2.body.message).toBe('Customer already exists');
  });
});

describe('PUT - /customers', () => {
  let login;
  beforeAll(async () => {
    await requestApp.post('/v1/customers').send({
      username: 'test',
      email: 'test@contact.com',
      password: '1234567',
    });

    login = await requestApp
      .post('/v1/customers/login')
      .send({ email: 'test@contact.com', password: '1234567' });
  });

  afterAll(async () => {
    await deleteCustomerTest('test@contact.com');
  });

  test('should be able to update the username or the password', async () => {
    const updating = await requestApp
      .put('/v1/customers')
      .set('x-access-token', login.body.token || '')
      .send({ username: 'newUsername' });

    expect(updating.status).toBe(204);
  });

  test('should return a validation error when tries to update the username with invalid value', async () => {
    const updating = await requestApp
      .put('/v1/customers')
      .set('x-access-token', login.body.token || '')
      .send({ username: 'ne' });

    expect(updating.status).toBe(400);
    expect(updating.body).toMatchObject({
      body: [{ username: 'It is necessary to have more then 2 characters!' }],
      type: 'bad_request',
      message: 'Please, check the invalid fields value',
    });
  });

  test('should return an restrict access error when has not a token', async () => {
    const updating = await requestApp
      .put('/v1/customers')
      .set('x-access-token', '')
      .send({ username: 'newUsername' });

    expect(updating.status).toBe(401);
    expect(updating.body.message).toBe('Restrict Access!');
  });

  test('should return an invalid token error when has a invalid token', async () => {
    const updating = await requestApp
      .put('/v1/customers')
      .set('x-access-token', 'bAs0S3DeH8h7koKow')
      .send({ username: 'newUsername' });

    expect(updating.status).toBe(401);
    expect(updating.body.message).toBe('Invalid Token');
  });
});

describe('POST Authentication - /customers', () => {
  beforeAll(async () => {
    await requestApp.post('/v1/customers').send({
      username: 'test',
      email: 'test@contact.com',
      password: '1234567',
    });
  });

  test('should return an error when fail to make login', async () => {
    const login = await requestApp
      .post('/v1/customers/login')
      .send({ email: 'test@contact.com', password: '123456' });

    expect(login.status).toBe(404);
    expect(login.body.type).toBe('not_found');
    expect(login.body.message).toBe('Email or password invalid');
  });

  test('should return a restrict access error when does not exist a token to refresh', async () => {
    const refreshToken = await requestApp.post('/v1/customers/refresh-token');

    expect(refreshToken.status).toBe(401);
    expect(refreshToken.body.message).toBe('Restrict Access!');
  });

  test('should return an invalid token when the token passed is invalid', async () => {
    const refreshToken = await requestApp
      .post('/v1/customers/refresh-token')
      .set('x-access-token', 'bAs0S3DeH8h7koKow');

    expect(refreshToken.status).toBe(401);
    expect(refreshToken.body.message).toBe('Invalid Token');
  });

  test('should refresh the token successfully and return a new valid token', async () => {
    const login = await requestApp
      .post('/v1/customers/login')
      .send({ email: 'test@contact.com', password: '1234567' });
    const refreshToken = await requestApp
      .post('/v1/customers/refresh-token')
      .set('x-access-token', login.body.token || '');

    expect(refreshToken.status).toBe(200);
    expect(refreshToken.body.token).not.toMatch(login.body.token);
  });
});
