const fs = require("fs");
const path = require("path");
const dns = require("dns");
const http = require("http");

const start = Date.now();
// These processes should run asynchronously
const fileRead = () => {
  console.log("Starting file read");

  fs.readFile(path.join(__dirname, "note.txt"), "utf-8", (err, content) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("File content:", content, "Time: ", Date.now() - start);
  });

  console.log("After file reading function");
};

const dnsResolve = () => {
  console.log("Starting dns lookup");
  dns.resolve("google.com", (err, content) => {
    if (err) console.log(err);
    console.log(content, "Time: ", Date.now() - start);
  });
  console.log("Dns resolve ended");
};

const downloadImage = () => {
  http.request(
    {
      host: "https://images.pexels.com",
      path: "/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("File downloaded");
      });
    }
  );
};

downloadImage();
