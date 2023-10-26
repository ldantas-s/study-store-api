# mongo and mongo-express setup

[Mongo - DockerHub](https://hub.docker.com/_/mongo)
[Mongo-Express - DockerHub](https://hub.docker.com/_/mongo-express)

```bash
~ docker network create mongo-network

~ docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb \
--net mongo-network \
mongo

~ docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--name mongo-express \
--net mongo-network \
mongo-express
```

> ps: the default authentication for mongo-express interface is
>
> - mongoUrl: 'mongodb://admin:password@localhost:27017/'
> - username: admin
> - password: pass

## Brevo

[Service to send emails](https://app.brevo.com/)
