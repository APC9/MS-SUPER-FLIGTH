<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Despligue con Docker

```bash
# development
# * Docker se desplegara en el puerto 80 (Si este puerto esta ocupado en la maquina local se debe cambiar en el archivo docker-compose.dev.yml)
docker-compose -f docker-compose.dev.yaml up --build -d

# deploy from Docker hub
docker-compose -f docker-compose.prod.yaml up --build -d
```


## Correr Aplicacion

### API GATEWAY

```bash
# *  http://localhost:80/api/docs

```

```bash

cd api-gateway

yarn 

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Microservicio Usuarios

```bash

cd microservice-users

yarn 

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Microservicio Pasajeros

```bash

cd microservice-passengers

yarn 

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Microservicio Vuelos

```bash

cd microservice-flights

yarn 

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

