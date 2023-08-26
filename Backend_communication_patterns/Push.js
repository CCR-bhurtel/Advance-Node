const http = require('http');

const WebSocketServer = require('websocket').server;

const httpServer = http.createServer();

let connections = [];

const server = httpServer.listen(8080, () => {
    console.log('server is listening on port 8080');
});

const websocket = new WebSocketServer({ httpServer: server });

websocket.on('request', (request) => {
    const connection = request.accept(null, request.origin);

    connection.on('close', () => {
        const portAddress = connection.socket.remotePort;

        connections = connections.filter((c) => c.socket.remotePort !== portAddress);

        connections.forEach((c) => c.send(`User ${connection.socket.remotePort} has left`));
    });

    connection.on('message', (message) => {
        connections.forEach((c) => c.send(`User ${connection.socket.remotePort} says: ${message.utf8Data}`));
    });

    connections.push(connection);

    connections.forEach((c) => c.send(`User ${connection.socket.remotePort} has joined`));
});
