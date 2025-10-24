const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { generalLimiter } = require('./middleware/rateLimiting');
const tls = require('tls');

// Ensure TLS v1.2+ for MongoDB Atlas connectivity on some Windows/network setups
tls.DEFAULT_MIN_VERSION = 'TLSv1.2';
const result = require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });
if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

console.log('Environment variables loaded:', {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER
});

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Configure trust proxy safely (do not use plain `true`)
// Allows correct client IP detection behind known number of proxies
// Set TRUST_PROXY to a number (e.g., 1 for single proxy like Cloudflare/Nginx)
const TRUST_PROXY = process.env.TRUST_PROXY;
if (typeof TRUST_PROXY !== 'undefined') {
  let trustValue;
  if (TRUST_PROXY === 'false') {
    trustValue = false;
  } else if (TRUST_PROXY === 'true') {
    // Avoid permissive trust proxy; default to 1 if user sets true
    trustValue = 1;
  } else if (!isNaN(Number(TRUST_PROXY))) {
    trustValue = Number(TRUST_PROXY);
  } else {
    // Accept specific subnet or IP strings per Express docs
    trustValue = TRUST_PROXY;
  }
  app.set('trust proxy', trustValue);
  console.log('Trust proxy configured:', trustValue);
}

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing middleware
app.use(cookieParser(process.env.COOKIE_SECRET));

// MongoDB Connection (Atlas)
const DB_NAME = process.env.MONGODB_DB_NAME || 'elite-filing';
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables.');
  process.exit(1);
}

mongoose.set('sanitizeFilter', true);

// Start server only after successful DB connection
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      w: 'majority',
      family: 4, // Prefer IPv4 to avoid IPv6 DNS issues on some networks
      tls: true  // Explicitly enable TLS for Atlas
    });
    console.log(`MongoDB connected successfully to database: ${DB_NAME}`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error during startup:', err);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log(`MongoDB connection established (db: ${DB_NAME})`);
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error event:', err);
});
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection disconnected');
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Elite Filing API Server is running!' });
});

// If DB is not ready, fail fast instead of buffering timeouts
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database unavailable', code: 'DB_UNAVAILABLE' });
  }
  next();
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/files', require('./routes/files'));
app.use('/api/logo-requests', require('./routes/logoRequests'));
app.use('/api/onboarding', require('./routes/onboarding'));
app.use('/api/trademark-requests', require('./routes/trademarkRequests'));
app.use('/api/uk-shared-office-requests', require('./routes/ukSharedOfficeRequests'));
app.use('/api/registered-agent-requests', require('./routes/registeredAgentRequests'));
app.use('/api/us-llc-formation-requests', require('./routes/usLlcFormationRequests'));
app.use('/api/us-tax-filing-requests', require('./routes/usTaxFilingRequests'));
app.use('/api/itin-requests', require('./routes/itinRequests'));
// Pakistan submissions
app.use('/api/pak-secp-registration-requests', require('./routes/pakSecpRegistrationRequests'));
app.use('/api/pak-fbr-registration-requests', require('./routes/pakFbrRegistrationRequests'));
app.use('/api/pak-pseb-registration-requests', require('./routes/pakPsebRegistrationRequests'));
app.use('/api/pakistan-complete-package-requests', require('./routes/pakistanCompletePackageRequests'));
app.use('/api/us-complete-package-requests', require('./routes/usCompletePackageRequests'));
app.use('/api/uk-company-registration-requests', require('./routes/ukCompanyRegistrationRequests'));
  app.use('/api/uk-annual-accounts-requests', require('./routes/ukAnnualAccountsRequests'));
  app.use('/api/uk-company-name-change-requests', require('./routes/ukCompanyNameChangeRequests'));
  app.use('/api/uk-structure-change-requests', require('./routes/ukStructureChangeRequests'));
  app.use('/api/uk-confirmation-statement-requests', require('./routes/ukConfirmationStatementRequests'));
  app.use('/api/uk-eori-application-requests', require('./routes/ukEoriApplicationRequests'));
  app.use('/api/amazon-ecommerce-requests', require('./routes/amazonEcommerceRequests'));
  app.use('/api/walmart-ecommerce-requests', require('./routes/walmartEcommerceRequests'));
  app.use('/api/etsy-ecommerce-requests', require('./routes/etsyEcommerceRequests'));
  app.use('/api/uk-vat-return-requests', require('./routes/ukVatReturnRequests'));
  app.use('/api/uk-bank-account-requests', require('./routes/ukBankAccountRequests'));
  app.use('/api/uk-vat-registration-requests', require('./routes/ukVatRegistrationRequests'));

  // UAE submissions
  app.use('/api/uae-spc-free-requests', require('./routes/uaeSpcFreeRequests'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize server
startServer();

module.exports = app;