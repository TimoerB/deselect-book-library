# deselect-book-library

A simple “Book Library” application.

The application consists of a RESTful Node.js backend with connection to a MongoDB database and a React frontend to consume and display data.

## Backend

Navigate to the `backend` directory. And create a `.env` file with the following variables:

```
echo -e "PORT=5000 \nMONGO_URI=mongodb://localhost:27017/booklibrary" > .env
```

### Install

To install the dependencies, run `npm install`.

Dependencies that were installed:

```
npm install express express-validator mongoose dotenv
```

Dependencies that were installed for development:

```
npm install --save-dev jest supertest mongodb-memory-server
```

### Run

To run the backend, run `npm start`.

### Run tests

To run the tests, run `npm test`.    

### Run locally

To run MongoDB locally, run `docker compose up -d`.

After which you can run the backend:

```
npm start
```