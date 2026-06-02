import http from 'http';

const data = JSON.stringify({
  name: 'Test Bod',
  products: 'Frugt',
  location: 'Aalborg',
  openingHours: '09-17',
  image: 'https://placehold.co/300x200',
  latitude: 57.049,
  longitude: 9.921,
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/booths',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('response:', body);
  });
});
req.on('error', (error) => {
  console.error('request error:', error);
});
req.write(data);
req.end();
