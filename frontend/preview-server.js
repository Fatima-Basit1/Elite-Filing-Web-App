const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'build');
const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function safeJoin(base, target) {
  const targetPath = path.posix.normalize(target).replace(/^\/+/, '');
  return path.join(base, targetPath);
}

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURI(req.url.split('?')[0]);
    let filePath = safeJoin(root, urlPath === '/' ? '/index.html' : urlPath);

    // If file doesn't exist, fallback to index.html for SPA routing
    if (!fs.existsSync(filePath)) {
      filePath = path.join(root, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
  }
});

server.listen(port, () => {
  console.log(`Preview at http://localhost:${port}/`);
});