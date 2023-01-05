const https = require('https');

const start = Date.now();

function performRequest() {
    https
        .request('https://www.google.com/', (res) => {
            res.on('data', (data) => {});
            res.on('end', () => {
                console.log(Date.now() - start);
            });
        })
        .end();
}

for (let i = 0; i < 10; i++) {
    performRequest();
}

// neiher libuv nor node has the ability to execute the super low level like
// performing the network request
// Is is forwarded to the Underlying OS
// Libuv is responsible for issuing the request to OS, and it waits for sometime for response

//  The operating system itself decides whether to make a new thread or not.
//  As OS is performing all of the work, the libuv threadpool doesn't play a single role here.


//   ---------------------COMMON QUESTIONS----------------------

//  What functions in node std library use the OS's async featuers?
// - Almost everything around networking for all OS's. Some other stuff
//  is OS specific

//  How does this os async stuff fit into the event loop?
// - Tasks using the underlying OS are reflected in 'pendingOSTasks' array
// (app.listen running on the command line)
