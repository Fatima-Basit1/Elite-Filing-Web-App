const http = require('http');

const BASE_URL = 'http://localhost:5000';

function httpRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'close',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...headers,
      },
    };

    const req = http.request(`${BASE_URL}${path}`, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const text = data || '';
        let json;
        try {
          json = text ? JSON.parse(text) : {};
        } catch (e) {
          json = { parseError: e.message, raw: text };
        }
        resolve({ status: res.statusCode, body: json });
      });
    });

    req.on('error', (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });
}

async function signupAndLogin() {
  const email = `qa+${Date.now()}@example.com`;
  const password = 'StrongP@ssw0rd!';

  const signupRes = await httpRequest('POST', '/api/auth/signup', {
    name: 'Test User',
    email,
    password,
    confirmPassword: password,
  });

  if (signupRes.status !== 201) {
    throw new Error(`Signup failed: ${signupRes.status} ${JSON.stringify(signupRes.body)}`);
  }

  const token = signupRes.body?.tokens?.accessToken;
  if (!token) throw new Error('No access token returned from signup');

  return { email, token };
}

function samplePayload(email, services) {
  return {
    firstName: 'John',
    lastName: 'Doe',
    email,
    phoneNumber: '+1-555-0101',
    residentialAddress: '123 Main St, Springfield',
    dateOfBirth: '1990-01-01',
    companyProposedName: 'Acme Widgets LLC',
    state: 'Delaware',
    numberOfMembers: 1,
    businessIndustry: 'E-commerce',
    services,
    message: 'QA test submission',
  };
}

async function run() {
  try {
    console.log('Signing up and obtaining token...');
    const { email, token } = await signupAndLogin();

    const authHeader = { Authorization: `Bearer ${token}` };

    // Case 1: Valid - individual services only
    console.log('\nSubmitting individual services only...');
    const case1 = await httpRequest(
      'POST',
      '/api/us-llc-formation-requests',
      samplePayload(email, ['LLC formation', 'EIN registration']),
      authHeader
    );
    console.log('Status:', case1.status);
    console.log('Response:', JSON.stringify(case1.body));

    // Case 2: Valid - Complete Package only
    console.log('\nSubmitting Complete Package only...');
    const case2 = await httpRequest(
      'POST',
      '/api/us-llc-formation-requests',
      samplePayload(email, ['Complete Package']),
      authHeader
    );
    console.log('Status:', case2.status);
    console.log('Response:', JSON.stringify(case2.body));

    // Case 3: Invalid - Complete Package with individuals
    console.log('\nSubmitting Complete Package + individual service (invalid)...');
    const case3 = await httpRequest(
      'POST',
      '/api/us-llc-formation-requests',
      samplePayload(email, ['Complete Package', 'LLC formation']),
      authHeader
    );
    console.log('Status:', case3.status);
    console.log('Response:', JSON.stringify(case3.body));

    if (case1.status !== 201) throw new Error('Case 1 failed (expected 201)');
    if (case2.status !== 201) throw new Error('Case 2 failed (expected 201)');
    if (case3.status !== 400) throw new Error('Case 3 failed (expected 400)');

    console.log('\nAll tests passed ✅');
  } catch (err) {
    console.error('Test runner error:', err.message);
    process.exit(1);
  }
}

run();