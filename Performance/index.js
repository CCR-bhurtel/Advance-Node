const express = require('express');

const app = express();

function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hello there');
});

const port = 3000;

app.listen(port, (req, res) => {
    console.log(`App running in port ${port}`);
});
