const https = require('https');

process.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

const fs = require('fs');

const start = Date.now();
const path = require('path');
// async file's content
function performRequest() {
    // this is not a work of libuv or v8, its upto os (libuv waits for response from os)
    https
        .request('https://www.google.com/', (res) => {
            res.on('data', (data) => {});
            res.on('end', () => {
                console.log(`Request :`, Date.now() - start);
            });
        })
        .end();
}

// for (let i = 0; i < 10; i++) {
//     performRequest(i);
// }
function performHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, key) => {
        console.log('Hash: ', Date.now() - start);
    });
}

// This function doesn't work with threadPool
performRequest();

// These functions work with threadPool
fs.readFile(path.join(__dirname, 'multiTask.js'), 'utf-8', () => {
    console.log('Fs: ', Date.now() - start);
});

performHash();
performHash();
performHash();
performHash();
