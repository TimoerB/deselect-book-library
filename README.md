# deselect-book-library

A simple “Book Library” application.

The application consists of a RESTful Node.js backend with connection to a MongoDB database and a React frontend to consume and display data.

## Install

To install the dependencies, run `npm install` in the root directory.

Dependencies that were installed:

```
npm install express express-validator mongoose dotenv
```

Dependencies that were installed for development:

```
npm install --save-dev jest supertest mongodb-memory-server
```

## Run

### Run locally

To run MongoDB locally, run `docker compose up -d` in the root directory.

To run the backend:

```
node index.js
```