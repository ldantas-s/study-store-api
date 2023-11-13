const path = require('path');
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['__mocks__'],
};
