const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);


  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Request received");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Request received");
  } else if (req.url === "/products") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Request received");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {});
