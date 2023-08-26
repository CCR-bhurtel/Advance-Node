const express = require('express');
const { Worker, MessageChannel } = require('worker_threads');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'success',
        pid: process.pid,
    });
});

app.get('/slow', (req, res) => {
    const worker1 = new Worker('./worker1.js');
    const { port1, port2 } = new MessageChannel();
    port1.on('message', (data) => {
        res.status(200).send({
            count: data,
            pid: process.pid,
        });
    });
    worker1.postMessage(port2, [port2]);
});

app.listen(3000, (req, res) => {
    console.log('Server listening in port 3000');
});
