# deselect-book-library

A simple “Book Library” application.

The application consists of a RESTful Node.js backend with connection to a MongoDB database and a React frontend to consume and display data.

## Backend

Navigate to the `backend` directory. And create a `.env` file with the following variables:

```
echo -e "PORT=5000 \nMONGO_URI=mongodb://localhost:27017/booklibrary" > .env
```

Make sure to create a JWT_SECRET in the `.env` file:

```
echo "JWT_SECRET=********" >> .env
```

### Install

To install the dependencies, run `npm install`.

Dependencies that were installed:

```
npm install express express-validator mongoose dotenv bcryptjs bcrypt jsonwebtoken redis cors
```

Dependencies that were installed for development:

```
npm install --save-dev jest supertest mongodb-memory-server ioredis-mock
```

### Run

To run the backend separately, run `npm start`.

To run backend, mongodb and redis in the docker compose file, run:

```
docker compose up --build
```

### Run tests

To run the tests, run `npm test`.

## Frontend

### Install 

Navigate to the `frontend` directory and install dependencies:

```
npm i
```

### Run

Then run the UI:

```
npm run dev
```
