import express from 'express';
import cors from 'cors';

const server = express()
server.use(cors())
const port = 8888;

const api = require('./routes/graphql');
server.use(api);

server.listen(port, () => console.log(`graphql on port ${port}`));

// console.log(result.payload[0].locations.filter((item)=>{ return item.extra.rentalBikes !== undefined}))
