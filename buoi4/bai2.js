const http = require('http');
const url = require('url'); 
const querystring = require('querystring'); 

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);

  if (parsedUrl.pathname === '/search') {
    const queryData = querystring.parse(parsedUrl.query);

    const keyword = queryData.keyword || '';
    const page = queryData.page || 1; 

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      keyword: keyword,
      page: page
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Route Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/search?keyword=nodejs&page=2`);
});