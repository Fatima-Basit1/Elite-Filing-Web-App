const USLLCFormationRequest = require('../models/USLLCFormationRequest');

function makeDoc(services) {
  return new USLLCFormationRequest({
    userId: '000000000000000000000000',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '+1-555-0101',
    residentialAddress: '123 Main St',
    dateOfBirth: new Date('1990-01-01'),
    companyProposedName: 'Acme Widgets LLC',
    state: 'Delaware',
    numberOfMembers: 1,
    businessIndustry: 'E-commerce',
    services,
    message: 'Test',
  });
}

function test(label, services) {
  const doc = makeDoc(services);
  const err = doc.validateSync();
  const hasError = !!err;
  console.log(`Test: ${label}`);
  if (hasError) {
    const messages = Object.values(err.errors).map(e => e.message);
    console.log('  Validation failed:', messages);
  } else {
    console.log('  Validation passed');
  }
}

console.log('Running schema-level services validation tests...');

// Should pass
test('Individuals only', ['LLC formation', 'EIN registration']);

// Should pass
test('Complete Package only', ['Complete Package']);

// Should fail
test('Complete Package + individual', ['Complete Package', 'LLC formation']);

// Should fail
test('Duplicates', ['LLC formation', 'LLC formation']);