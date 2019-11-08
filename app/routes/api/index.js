try {

    const fetch = require('node-fetch');
    var mcache = require('memory-cache');
    const nsApi = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'gpdUysxVJ2e8ameC2hAWVs6TF3R5HfaOisFz2B70'
        },
        'baseUrl':'https://ns-api.nl/reisinfo/api/v2',
        'placesUrl':'https://ns-api.nl/places/api/v2',
        'tripsUrl':'https://ns-api.nl/reisinfo/api/v3'
    }

    const server = require("../../lib/server");
    const cache = (duration) => {
        return (req, res, next) => {
          let key = '__express__' + req.originalUrl || req.url
          let cachedBody = mcache.get(key)
          if (cachedBody) {
            res.send(cachedBody)
            return
          } else {
            res.sendResponse = res.send
            res.send = (body) => {
              mcache.put(key, body, duration * 1000);
              res.sendResponse(body)
            }
            next()
          }
        }
      }

    //stations
    server.get('/api/stations', cache(2592000), function(req, res) {
        fetch(`${nsApi.baseUrl}/stations`, {
            method: 'get',
            headers: nsApi.headers,
        })
        .then(res => res.json())
        .then(json => {
            res.writeHead(200, {"content-type":"application/json"});
            json = JSON.stringify(json.payload);
            res.end(json);
        });
    });

    server.get("/api/departures", function(req, res) {
        fetch(`${nsApi.baseUrl}/departures?station=${req.query.station}`, {
            method: 'get',
            headers: nsApi.headers,
        })
        .then(res => res.json())
        .then(json => {
            res.writeHead(200, {"content-type":"application/json"});
            json = JSON.stringify(json);
            res.end(json);
        });
    });

    server.get("/api/ovfiets", function(req, res) {
        fetch(`${nsApi.placesUrl}/ovfiets?station_code=${req.query.station}`, {
            method: 'get',
            headers: nsApi.headers,
        })
        .then(res => res.json())
        .then(json => {
            res.writeHead(200, {"content-type":"application/json"});
            json = JSON.stringify(json);
            res.end(json);
        });
    });
    //note: station kan meerder afgifte punten hebben
    server.get("/api/trips", function(req, res) {
        fetch(`${nsApi.tripsUrl}/trips?fromStation=${req.query.fromStation}&toStation=${req.query.toStation}`, {
            method: 'get',
            headers: nsApi.headers,
        })
        .then(res => res.json())
        .then(json => {
            res.writeHead(200, {"content-type":"application/json"});
            json = JSON.stringify(json);
            res.end(json);
        });
    });

    module.exports = server

    }
catch (ex) {
    console.log('API Error', ex)
}

// ov fiets
// https://t.co/OYtGFEmJME
// http://data.openov.nl/
// https://developer.ns.nl/docs/mlab/reisinfo
// https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
// https://github.com/coryhouse/graphql/blob/master/examples/wrap-rest-api/src/schema.js
// https://www.apollographql.com/docs/link/links/rest/#gatsby-focus-wrapper
// https://graphql-modules.com/docs/recipes/data-sources
// https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express
// https://www.robinwieruch.de/graphql-apollo-server-tutorial#apollo-server-setup-express
//
// https://blog.apollographql.com/layering-graphql-on-top-of-rest-569c915083ad
// https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/