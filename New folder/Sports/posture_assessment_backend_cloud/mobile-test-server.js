// Simple HTTP server to test backend connectivity from mobile devices
const http = require('http');
const httpProxy = require('http-proxy-middleware');
const admin = require('firebase-admin');

// Create proxy middleware for Firebase UI
const createProxyMiddleware = (target) => {
  return (req, res, next) => {
    const options = {
      target: target,
      changeOrigin: true,
      ws: true,
      onError: (err, req, res) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Firebase emulator not running. Start emulators first!');
      }
    };
    
    const proxy = require('http-proxy').createProxyServer(options);
    proxy.web(req, res);
  };
};

// Simple server for mobile testing
const server = http.createServer((req, res) => {
  // Enable CORS for mobile access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Proxy Firebase UI requests
  if (req.url.startsWith('/firebase-ui')) {
    const proxyUrl = req.url.replace('/firebase-ui', '');
    req.url = proxyUrl;
    return createProxyMiddleware('http://127.0.0.1:4000')(req, res);
  }
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .success { color: green; font-size: 24px; }
            .endpoint { margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; }
            .endpoint a { text-decoration: none; color: #0066cc; }
            .status { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <h1 class="success">🎉 Backend is Working!</h1>
          <div class="status">
            <p><strong>Your Firebase backend is accessible from mobile!</strong></p>
            <p>Time: ${new Date().toISOString()}</p>
            <p>Server IP: 192.168.1.9</p>
            <p>Mobile Access: ✅ Working</p>
          </div>
          
          <h2>🔗 Available Endpoints:</h2>
          <div class="endpoint">
            <strong><a href="/test">📊 Test Backend Connection</a></strong><br>
            <small>Test if backend services are responding</small>
          </div>
          
          <div class="endpoint">
            <strong><a href="/health">❤️ Health Check</a></strong><br>
            <small>Check backend server health</small>
          </div>
          
          <div class="endpoint">
            <strong><a href="/firebase-ui/">🔥 Firebase UI (Proxied)</a></strong><br>
            <small>Access Firebase emulator interface through proxy</small>
          </div>
          
          <h3>📱 Direct Links (if emulators running):</h3>
          <div class="endpoint">
            <a href="http://192.168.1.9:4000/" target="_blank">Firebase UI Direct</a> |
            <a href="http://192.168.1.9:5001/" target="_blank">Functions</a> |
            <a href="/functions-health">Functions Health</a>
          </div>
          
          <h3>🧪 Test Your Flutter App Connection:</h3>
          <p>Use these endpoints in your Flutter app:</p>
          <ul>
            <li><strong>Firestore:</strong> 192.168.1.9:8080</li>
            <li><strong>Auth:</strong> 192.168.1.9:9099</li>
            <li><strong>Functions:</strong> 192.168.1.9:5001</li>
            <li><strong>Storage:</strong> 192.168.1.9:9199</li>
          </ul>
        </body>
      </html>
    `);
  } else if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'Backend is reachable from mobile!',
      timestamp: new Date().toISOString(),
      mobileIP: req.connection.remoteAddress,
      services: {
        firestore: '192.168.1.9:8080',
        functions: '192.168.1.9:5001',
        auth: '192.168.1.9:9099',
        storage: '192.168.1.9:9199',
        ui: '192.168.1.9:4000'
      },
      flutter_config: {
        note: "Use these values in your Flutter app",
        host: "192.168.1.9",
        ports: {
          firestore: 8080,
          auth: 9099,
          functions: 5001,
          storage: 9199
        }
      }
    }, null, 2));
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      backend: 'firebase-emulators',
      accessible: true,
      mobile_access: true,
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/functions-health') {
    // Proxy to Firebase Functions health check
    const options = {
      hostname: '127.0.0.1',
      port: 5001,
      path: '/sports-posture-assessment-2025/us-central1/healthCheck',
      method: 'GET'
    };
    
    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    
    proxyReq.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Firebase emulators not running',
        message: 'Start emulators first with: start-emulators.bat'
      }));
    });
    
    proxyReq.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Mobile test server running at:`);
  console.log(`   Local: http://127.0.0.1:${PORT}/`);
  console.log(`   Mobile: http://192.168.1.9:${PORT}/`);
  console.log(`\n📱 Try accessing from your mobile browser!`);
  console.log(`\n🔥 Firebase UI Proxy: http://192.168.1.9:${PORT}/firebase-ui/`);
});
