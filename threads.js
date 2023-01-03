const OS = require("os");
const dotenv = require("dotenv");
const crypto = require("crypto");
const path = require("path");

const start = Date.now();

dotenv.config({ path: path.join(__dirname, ".env") });
crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, key) => {
  console.log("1:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, key) => {
  console.log("2:", Date.now() - start);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, key) => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, key) => {
  console.log("4:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, key) => {
  console.log("5:", Date.now() - start);
});

// the both function runs at same time, which shows the node is multithreaded

// Node.js uses libuv's thread pooling mechanism to use pool of 4 threads
// that runs to compute the complex calculations
