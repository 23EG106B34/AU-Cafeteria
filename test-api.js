const http = require('http');

// Test order creation
const testOrder = {
  place: 'APJ Abdul Kalam Canteen',
  item: 'Idly x2, Coffee x1',
  price: 75
};

const postData = JSON.stringify(testOrder);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/order',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Testing order creation...');
const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);

  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    console.log('Response body:', body);

    if (res.statusCode === 200) {
      console.log('✅ Order creation test passed!');
      testGetOrders();
    } else {
      console.log('❌ Order creation test failed!');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();

function testGetOrders() {
  console.log('\nTesting get orders...');
  http.get('http://localhost:3000/admin/orders', (res) => {
    console.log(`Status: ${res.statusCode}`);

    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      console.log('Orders response:', body);
      console.log('✅ Get orders test completed!');
    });
  }).on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });
}
