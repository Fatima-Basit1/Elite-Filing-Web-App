const http = require('http');
const HOST = '127.0.0.1';
const PORT = 5000;

function postSignup(payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: HOST,
      port: PORT,
      path: '/api/auth/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Connection': 'close'
      }
    };
    const req = http.request(options, (res) => {
      let chunks = '';
      res.on('data', (d) => (chunks += d));
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: chunks });
      });
    });
    req.on('error', (err) => {
      resolve({ error: err.message });
    });
    req.write(data);
    req.end();
  });
}

function postLogin(payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: HOST,
      port: PORT,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Connection': 'close'
      }
    };
    const req = http.request(options, (res) => {
      let chunks = '';
      res.on('data', (d) => (chunks += d));
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: chunks });
      });
    });
    req.on('error', (err) => {
      resolve({ error: err.message });
    });
    req.write(data);
    req.end();
  });
}

function getRoot() {
  return new Promise((resolve) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: '/',
      method: 'GET'
    };
    const req = http.request(options, (res) => {
      let chunks = '';
      res.on('data', (d) => (chunks += d));
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: chunks });
      });
    });
    req.on('error', (err) => resolve({ error: err.message }));
    req.end();
  });
}

(async () => {
  const unique = Date.now();
  const okPayload = {
    name: 'CI Test User',
    email: `ci.signup.test+${unique}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Password123!'
  };

  const badPayload = {
    name: 'Bad User',
    email: `ci.signup.bad+${unique}@example.com`,
    password: '123',
    confirmPassword: '123'
  };

  const okRes = await postSignup(okPayload);
  console.log('OK STATUS', okRes.statusCode ?? 'ERR');
  console.log(okRes.body ?? okRes.error);

  if (okRes.statusCode === 201) {
    const loginRes = await postLogin({ email: okPayload.email, password: okPayload.password });
    console.log('LOGIN STATUS', loginRes.statusCode ?? 'ERR');
    console.log(loginRes.body ?? loginRes.error);
  }

  const badRes = await postSignup(badPayload);
  console.log('BAD STATUS', badRes.statusCode ?? 'ERR');
  console.log(badRes.body ?? badRes.error);

  const rootRes = await getRoot();
  console.log('ROOT STATUS', rootRes.statusCode ?? 'ERR');
  console.log(rootRes.body ?? rootRes.error);
})();