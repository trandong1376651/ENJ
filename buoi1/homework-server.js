const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Welcome to my Node.js homework.");
    } 
    else if (req.url === "/profile") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Tên học viên: Đông, Lớp: C2411L, Mục tiêu: Mãi Húp");
    } 
    else if (req.url === "/nodejs") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Node.js là một runtime environment chạy mã JavaScript bên ngoài trình duyệt, được xây dựng trên V8 engine.");
    }
    else if (req.url === "/api/server-info") {
        res.writeHead(200, { "Content-Type": "application/json" });
        
        const serverInfo = {
            runtime: "Node.js",
            language: "JavaScript",
            type: "server-side"
        };
        
        res.end(JSON.stringify(serverInfo));
    }
    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>About Server-side Development</h1><p>Server-side programming processes logic on the server.</p>");
    } 
    
    else {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {});