const http = require('http');

// Test home page
console.log('Testing home page...');
http.get('http://localhost:3000/', (res) => {
  console.log(`Status: ${res.statusCode}`);

  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    if (body.includes('AU Cafeteria') && body.includes('<!doctype html>')) {
      console.log('✅ Home page loads successfully!');
      testAboutPage();
    } else {
      console.log('❌ Home page failed to load properly');
    }
  });
}).on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

function testAboutPage() {
  console.log('\nTesting about page...');
  http.get('http://localhost:3000/about', (res) => {
    console.log(`Status: ${res.statusCode}`);

    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      if (body.includes('About') && body.includes('AU Cafeteria')) {
        console.log('✅ About page loads successfully!');
        testAPJPage();
      } else {
        console.log('❌ About page failed to load properly');
      }
    });
  }).on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });
}

function testAPJPage() {
  console.log('\nTesting APJ page...');
  http.get('http://localhost:3000/apj', (res) => {
    console.log(`Status: ${res.statusCode}`);

    res.setEncoding('utf8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      if (body.includes('APJ Abdul Kalam Canteen') && body.includes('Idly')) {
        console.log('✅ APJ page loads successfully!');
        console.log('\n🎉 All pages are working correctly!');
        console.log('You can now safely delete the HTML files.');
      } else {
        console.log('❌ APJ page failed to load properly');
      }
    });
  }).on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });
}
