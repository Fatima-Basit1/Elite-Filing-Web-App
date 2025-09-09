# Elite Filing Web Application

A professional business services website built with React, Tailwind CSS, Express, and MongoDB. Elite Filing simplifies and enhances your business path with expert solutions in incorporation, taxation, trademarks, and more.

## Features

- 🏢 Professional business services landing page
- 🎨 Modern responsive UI with Tailwind CSS
- 📱 Mobile-responsive design
- 💬 Interactive chat widget
- 🧭 Professional navigation with service categories
- 🚀 RESTful API with Express.js (ready for future features)
- 🗄️ MongoDB database integration (ready for future features)
- ⚡ Fast loading and optimized performance

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Professional icon library
- **Responsive Design** - Mobile-first approach

### Backend (Ready for Future Features)
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Elite-Filing-Web-App
```

2. **Install all dependencies**
```bash
npm run install-all
```

3. **Set up environment variables**
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elite-filing
JWT_SECRET=your-secret-key
NODE_ENV=development
```

4. **Start the development servers**
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Available Scripts

### Root Level Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build frontend for production
- `npm run build:all` - Build both frontend and backend
- `npm run test` - Run tests for both frontend and backend
- `npm run start` - Start backend in production mode
- `npm run start:prod` - Build and start in production mode
- `npm run install-all` - Install dependencies for all packages
- `npm run clean` - Clean node_modules and build files
- `npm run lint` - Run linting for both frontend and backend

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run linting
- `npm run analyze` - Build and serve for analysis

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build backend
- `npm test` - Run tests
- `npm run lint` - Run linting

## Project Structure

```
Elite-Filing-Web-App/
├── backend/                    # Express.js API server (ready for future features)
│   ├── middleware/            # Custom middleware
│   │   └── auth.js           # Authentication middleware
│   ├── models/               # Mongoose models
│   │   ├── User.js          # User model
│   │   └── File.js          # File model
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── users.js         # User routes
│   │   └── files.js         # File routes
│   ├── .env.example         # Environment variables template
│   ├── server.js            # Express server setup
│   └── package.json         # Backend dependencies
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navigation/  # Navigation component
│   │   │   ├── Hero/        # Hero section component
│   │   │   └── ChatWidget/  # Chat widget component
│   │   ├── pages/           # Page components
│   │   │   ├── Home/        # Landing page
│   │   │   └── NotFound/    # 404 page
│   │   ├── services/        # API services (ready for future features)
│   │   │   └── api.js       # Axios configuration
│   │   ├── store/           # Redux store (ready for future features)
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.js    # PostCSS configuration
│   └── package.json         # Frontend dependencies
├── package.json              # Root package.json with scripts
└── README.md                # Project documentation
```

## Current Features

### Landing Page
- **Professional Navigation** - Clean navigation bar with service categories
- **Hero Section** - Compelling headline and call-to-action
- **Interactive Chat Widget** - Customer engagement tool
- **Responsive Design** - Works perfectly on all devices
- **Professional Branding** - Elite Filing logo and color scheme

### Service Categories
- **Business Solutions** - Comprehensive business services
- **Company Formation** - Business incorporation services
- **E-commerce** - Online business solutions
- **Contact & About** - Company information and contact details

## API Endpoints (Ready for Future Features)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Files
- `GET /api/files` - Get user files
- `POST /api/files` - Upload new file
- `GET /api/files/:id` - Get specific file
- `PUT /api/files/:id` - Update file
- `DELETE /api/files/:id` - Delete file

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elite-filing
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

## Deployment

### Production Build
```bash
npm run build:all
npm run start:prod
```

### Heroku Deployment
The project includes a `heroku-postbuild` script for easy Heroku deployment:

1. Create a Heroku app
2. Set environment variables in Heroku
3. Deploy using Git

```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue or contact the development team.

---

**Elite Filing Team** - Simplifying and enhancing your business path