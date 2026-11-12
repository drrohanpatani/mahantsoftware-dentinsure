const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'reviews.json');
const ADMIN_TOKEN = 'rohan2026';

// Initialize data directory and database file
function initDb() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
      approved: [
        {
          id: "rev_1",
          name: "Shobha S.",
          rating: 5,
          treatment: "Dental Implants",
          review: "I have done 3 implants by Dr. Rohan. He explains very nicely, makes comfortable & the procedure was done very smoothly. Very less pain. Thank you very much.",
          date: "2024-03-12",
          verified: true,
          source: "DentInsure Verified Member"
        },
        {
          id: "rev_2",
          name: "Karan S.",
          rating: 5,
          treatment: "Root Canal & Implant",
          review: "I visited Dr Rohan for root canal and implant treatment. He explains everything in detail and give you genuine suggestions. Moreover treatment charges are also very reasonable. He is friendly and co-operative. I would do like to recommend him for all dental treatments.",
          date: "2024-04-05",
          verified: true,
          source: "DentInsure Verified Member"
        },
        {
          id: "rev_3",
          name: "Jay V.",
          rating: 5,
          treatment: "Dental Implants",
          review: "The implant was done very smoothly and the charges are reasonable when you compare it with others. I would highly highly recommend everyone.",
          date: "2024-05-18",
          verified: true,
          source: "DentInsure Verified Member"
        }
      ],
      pending: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

initDb();

function readDb() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return { approved: [], pending: [] };
  }
}

function writeDb(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.vcf': 'text/vcard; charset=utf-8',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. API: GET /api/reviews -> Publicly approved reviews
  if (req.method === 'GET' && pathname === '/api/reviews') {
    const db = readDb();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, reviews: db.approved }));
    return;
  }

  // 2. API: POST /api/reviews -> Submit new review into moderation queue
  if (req.method === 'POST' && pathname === '/api/reviews') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50000) {
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { name, rating, treatment, review, honeypot } = payload;

        // Anti-spam Check 1: Honeypot field must be empty
        if (honeypot && honeypot.trim() !== '') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Spam detected.' }));
          return;
        }

        // Anti-spam Check 2: Rate limit by client IP
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        const now = Date.now();
        const lastSubmit = rateLimitMap.get(ip) || 0;
        if (now - lastSubmit < 15000) { // 15 seconds cooldown
          res.writeHead(429, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Please wait a moment before submitting another review.' }));
          return;
        }
        rateLimitMap.set(ip, now);

        // Validation
        if (!name || !name.trim() || !review || !review.trim() || !treatment) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'All fields are required.' }));
          return;
        }

        const numericRating = parseInt(rating, 10);
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Rating must be between 1 and 5.' }));
          return;
        }

        const db = readDb();

        // Anti-spam Check 3: Duplicate submission detection
        const cleanText = review.trim().toLowerCase();
        const isDuplicate = [...db.approved, ...db.pending].some(r =>
          r.name.toLowerCase() === name.trim().toLowerCase() &&
          r.review.toLowerCase() === cleanText
        );

        if (isDuplicate) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'A review with identical content has already been received.' }));
          return;
        }

        const newReview = {
          id: 'rev_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          name: name.trim().substring(0, 80),
          rating: numericRating,
          treatment: treatment.trim().substring(0, 80),
          review: review.trim().substring(0, 1000),
          date: new Date().toISOString().split('T')[0],
          status: 'pending',
          verified: false,
          clientIp: ip
        };

        db.pending.push(newReview);
        writeDb(db);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Review received successfully! It has been submitted to the clinic moderation queue and will appear publicly once verified.',
          id: newReview.id
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid review payload.' }));
      }
    });
    return;
  }

  // 3. API: GET /api/admin/reviews?key=... -> Retrieve all reviews (approved + pending moderation queue)
  if (req.method === 'GET' && pathname === '/api/admin/reviews') {
    const key = parsedUrl.searchParams.get('key');
    if (key !== ADMIN_TOKEN) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized clinic admin access.' }));
      return;
    }
    const db = readDb();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, approved: db.approved, pending: db.pending }));
    return;
  }

  // 4. API: POST /api/admin/moderate -> Approve or Reject a review
  if (req.method === 'POST' && pathname === '/api/admin/moderate') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { key, id, action } = JSON.parse(body);
        if (key !== ADMIN_TOKEN) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Unauthorized.' }));
          return;
        }

        const db = readDb();
        const pendingIdx = db.pending.findIndex(r => r.id === id);

        if (pendingIdx === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Review not found in pending queue.' }));
          return;
        }

        const [item] = db.pending.splice(pendingIdx, 1);

        if (action === 'approve') {
          item.status = 'approved';
          item.verified = true;
          item.source = 'DentInsure Verified Review';
          db.approved.unshift(item);
          writeDb(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Review approved and published!' }));
        } else if (action === 'reject') {
          writeDb(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Review rejected and removed from queue.' }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid action.' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Malformed request.' }));
      }
    });
    return;
  }

  // 5. Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security: Prevent directory traversal
  const safePath = path.normalize(filePath);
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 handler
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>The requested file could not be found.</p><p><a href="/">Return to Digital Card</a></p>`);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(safePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`Dr. Rohan Patani - Digital Visiting Card & Portfolio Server`);
  console.log(`Running on: http://localhost:${PORT}`);
  console.log(`Admin PIN: ${ADMIN_TOKEN}`);
  console.log(`================================================================`);
});

