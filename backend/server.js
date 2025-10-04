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