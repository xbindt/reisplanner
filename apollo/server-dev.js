import express from 'express';
import cors from 'cors';

const server = express()
server.use(cors())
const port = 8888

const gaphql = require('./routes/graphql');
server.use(gaphql);

server.listen(port, () => console.log(`API on port ${port}`))