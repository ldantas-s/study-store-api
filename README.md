# Store API

This project is a dedicated study initiative focused on honing skills in creating APIs using Node.js. It began by following instructional videos, and upon completing the initial lessons, I extended the project by incorporating essential elements that contribute to the robustness and maintainability of an API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Key Enhancements](#key-enhancements)
- [License](#license)
- [Contacts](#contacts)
<!-- - [Contributing](#contributing)
- [Documentation](#documentation)
- [Badges](#badges)
- [Acknowledgments](#acknowledgments)
- [Demo](#demo) -->

## Installation

To install this project, follow these steps:

- Clone the project:

```bash
git clone git@github.com:ldantas-s/study-store-api.git
```

- Install dependencies:

```
yarn
```

- It will be necessary to initialize the mongo, and I'm using the [MongoDB](https://hub.docker.com/_/mongo) and [Mongo-Express](https://hub.docker.com/_/mongo-express) with Docker. Run the command bellow:
  > PS: I will assume you already have the docker installed.

```bash
docker network create mongo-network

docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb \
--net mongo-network \
mongo

docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--name mongo-express \
--net mongo-network \
mongo-express
```

> - The default authentication for mongo-express admin is
> - username: admin
> - password: pass
> - mongoURI: 'mongodb://admin:password@localhost:27017/'

## Usage

- It will be necessary make a copy of `.env example` and renamed to `.env` define the values for each one of the variables:
  > PS: It's not exactly necessary to have the BREVO_KEY only if you want to receive an email when you register a new customer. But if wish you can take a look on [Brevo docs](https://developers.brevo.com/docs)

```
SALT_KEY=<This could be any uuid like -> '4963ad2b-acfa-42e9-a6a7-3337b197dbcc'>
EMAIL_TMPL='<strong>{0}</strong>'
MONGODB_URI=
BREVO_KEY=
NODE_ENV=[dev|test|production]
```

- To generate the docs, run:

```bash
yarn build:docs
```

- To start teh application, run:

```bash
yarn dev
```

and after that you can have access of all endpoints using an API Client or access the `http://localhost:3000/v1/docs/`

## Key Enhancements

- **Documentation**: Comprehensive documentation has been added to elucidate the functionality and usage of various endpoints, providing clear guidance for developers and users. It's used [Swagger v3](https://swagger.io/docs/specification/about/) and [Swagger-autogen](https://github.com/swagger-autogen/swagger-autogen#swagger-autogen)

- **Testing**: The project now includes a robust suite of tests to ensure the reliability and
  correctness of the implemented features, following best practices in software testing.

## License

This project is licensed under the [MIT License](./LICENSE)

## Contacts

Luciano Dantas -> [Linkdin](https://www.linkedin.com/in/ldantas-s/) - [Github](https://github.com/ldantas-s)
