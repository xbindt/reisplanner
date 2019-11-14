import express from 'express';
import cors from 'cors';

const server = express()
server.use(cors())
const port = 8888;

const graphql = require('./routes/graphql');
server.use(graphql);

server.listen(port, () => console.log(`graphql on port ${port}`))