# Backend My Portfolio

# Usage

### Clone Repo

```sh
git clone https://github.com/muhammadisa226/be-my-portfolio.git
```

### Project Setup

```sh
npm install
```

### Configure Database

```sh
npm run migrate
```

### Or Using Docker

#### Pull Docker Image

```sh
docker pull muhammadisa226/backend-my-portfolio:latest
```

#### Run Container from image

```sh
docker run -p 2023:8080 --name <container_name> -e DB_CONNECTION=mysql -e DB_USERNAME=<db username> -e DB_PASSWORD=<db password> -e DB_HOST=<db_host> -e DB_PORT=<db port> -e DB_DATABASE=<db_name>  -d muhammadisa226/backend-myportfolio:latest
```

#### entry the terminal in container docker

```sh
docker exec -t -i <container_name> /bin/sh
```
