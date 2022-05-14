// See https://github.com/triblondon/node-sse-pubsub/blob/master/demo/public/index.html
// for client usage
// Tested with:
// $ curl -X POST -d '{"user": "scott", "position": "1"}' -H 'Content-Type: application/json' http://localhost:3002


const express = require('express');
const SSEChannel = require('sse-pubsub');
const cors = require('cors');

// A channel for broadcasting updates to connected clients
const channel = new SSEChannel();

// User position updates
let users = {};

// Server-Side-Events for allowing clients to subscribe to what's happening
const sse = express();
sse.use(cors({
    origin: '*'
}));
sse.get('/', (req, res) => channel.subscribe(req, res));
sse.post('/map', (req, res) => {
    res.sendFile('/map');
});
sse.listen(3001, () => {
    console.log("Started SSE client app on port 3000");
});

// Small publisher app to allow (presumably) trusted clients to publish
const publisher = express();
publisher.use(express.json())
publisher.post('/user', (req, res) => {
    users = {
        ...users,
        ...req.body
    };
    channel.publish(users, "users");
    res.send("OK");
});
publisher.post('/map', (req, res) => {
    channel.publish('Update', "map");
    res.send("OK");
})

publisher.listen(3002, () => {
    console.log("Starting to listen for updates on port 3002");
});

