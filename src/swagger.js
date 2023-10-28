import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Store',
    description:
      'Basic API with authentication and manipulation of products and orders',
    termsOfService: 'http://localhost:3000/v1/terms',
    contact: {
      name: 'Luciano Dantas',
      email: 'ldantas.ti@gmail.com',
    },
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:3000/v1', description: 'API DEV' }],
  securityDefinitions: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-access-token',
    },
  },
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
