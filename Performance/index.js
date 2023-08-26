const cluster = require('cluster');
const crypto = require('crypto');
const Os = require('os');

process.env.UV_THREADPOOL_SIZE = 1; // only one thread available for each child

// if (cluster.isMaster) {
    //const cpus = Os.cpus().length
    // loop through cpus
//               cluster.fork();
// }else

// Child instances
const express = require('express');
const app = express();

app.get('/fast', (req, res) => {
    console.log('Here comes the superman');
    res.send(`This was fast, ${process.pid}`);
});
app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, key) => {
        console.log(key);
        res.send(`Hello there, ${process.pid}`);
    });
});

app.listen(3000, (req, res) => {
    console.log(`Server listening to port 3000, ${process.pid}`);
});
