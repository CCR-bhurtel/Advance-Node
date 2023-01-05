const cluster = require('cluster');
const crypto = require('crypto');
const Os = require('os');

process.env.UV_THREADPOOL_SIZE = 1; // only one thread available for each child

if (cluster.isPrimary) {
    const totalCpus = Os.cpus().length;
    console.log('mater process running', process.pid);
    // Causes index.js to be executed again but in child mode
    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
        if (i == 1) break;
    }

    cluster.on('error', (err) => {
        console.log(err);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else if (cluster.isWorker) {
    // Child instances
    const express = require('express');
    const app = express();

    app.get('/fast', (req, res) => {
        res.send(`This was fast, ${process.pid}`);
    });
    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, key) => {
            res.send(`Hello there, ${process.pid}`);
        });
    });

    app.listen(3000, (req, res) => {
        console.log(`Server listening to port 3000, ${process.pid}`);
    });
}
