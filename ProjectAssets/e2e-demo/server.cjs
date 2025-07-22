const http = require('http');
const httpProxy = require('http-proxy');
const path = require('path'); // for file path manipulation
const fs = require('fs'); // for file system access (optional)

// Configuration options (adjust as needed)
const port = process.env.PORT || 3010;
const proxyTarget = process.env.PROXY_TARGET || 'http://localhost:4010';
const staticFilesDirectory = './front-end'; // Directory containing static files

// Create an HTTP server instance
const server = http.createServer((req, res) => {
  // Check if the request URL matches a static file
  let reqURL = req.url === "/" ? "/index.html":req.url;
  const filePath = path.join(staticFilesDirectory, reqURL);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading static file:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        const contentType = getContentType(filePath); // Function to determine content type (optional)
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  } else {
    // Proxy the request to the target URL
    const proxy = httpProxy.createProxyServer();
    proxy.web(req, res, { target: proxyTarget });
  }
});

// Function to determine content type based on file extension (optional)
function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    // ... add more mime types as needed
  };
  return mimeTypes[extension] || 'application/octet-stream';
}

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
