# Development Guide

This guide will help you set up and develop the Elite Filing Web Application.

## Quick Start

1. **Clone and Install**
```bash
git clone <repository-url>
cd Elite-Filing-Web-App
npm run install-all
```

2. **Environment Setup**
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

3. **Start Development**
```bash
npm run dev
```

This starts both frontend (http://localhost:3000) and backend (http://localhost:5000).

## Project Architecture

### Frontend Structure
```
frontend/src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Files/          # File management components
│   ├── Layout/         # Layout components (Header, Sidebar)
│   └── UI/             # Generic UI components
├── pages/              # Page components
│   ├── Auth/           # Login, Register pages
│   ├── Dashboard/      # Dashboard page
│   ├── Files/          # Files management page
│   └── Profile/        # Profile page
├── services/           # API services
├── store/              # Redux store and slices
├── data/               # Sample data for development
└── utils/              # Utility functions
```

### Backend Structure
```
backend/
├── middleware/         # Express middleware
├── models/            # Mongoose models
├── routes/            # API routes
├── uploads/           # File upload directory
└── server.js          # Express server
```

## Development Workflow

### Frontend Development

1. **Component Development**
   - Create components in appropriate directories
   - Use functional components with hooks
   - Follow the existing naming conventions
   - Use Tailwind CSS for styling

2. **State Management**
   - Use Redux Toolkit for global state
   - Create slices for different features
   - Use React hooks for local state

3. **Routing**
   - Use React Router for navigation
   - Implement protected routes for authenticated pages
   - Use public routes for auth pages

### Backend Development

1. **API Development**
   - Create routes in the `routes/` directory
   - Use middleware for authentication and validation
   - Follow RESTful conventions

2. **Database Models**
   - Define Mongoose schemas in `models/`
   - Use proper validation and indexing
   - Implement relationships between models

3. **File Handling**
   - Use multer for file uploads
   - Implement file validation
   - Store files securely

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run build:all` - Build both applications
- `npm run test` - Run all tests
- `npm run lint` - Lint all code
- `npm run clean` - Clean build artifacts

### Frontend Only
```bash
cd frontend
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run lint       # Lint code
```

### Backend Only
```bash
cd backend
npm run dev        # Development server with nodemon
npm start          # Production server
npm test           # Run tests
npm run lint       # Lint code
```

## Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/elite-filing

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# CORS
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Files
- `GET /api/files` - Get user files
- `POST /api/files` - Upload file
- `GET /api/files/:id` - Get file details
- `PUT /api/files/:id` - Update file
- `DELETE /api/files/:id` - Delete file
- `GET /api/files/:id/download` - Download file

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password

## Testing

### Frontend Testing
- Use Jest and React Testing Library
- Test components, hooks, and utilities
- Run with `npm test` in frontend directory

### Backend Testing
- Use Jest and Supertest
- Test API endpoints and models
- Run with `npm test` in backend directory

### Integration Testing
- Test full user workflows
- Use sample data for consistent testing

## Code Style

### JavaScript/React
- Use ES6+ features
- Prefer functional components
- Use destructuring and spread operators
- Follow consistent naming conventions

### CSS/Styling
- Use Tailwind CSS utility classes
- Create custom components for reusable styles
- Follow mobile-first responsive design

### File Naming
- Components: PascalCase (e.g., `FileUpload.js`)
- Utilities: camelCase (e.g., `formatFileSize.js`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

## Debugging

### Frontend Debugging
- Use React Developer Tools
- Use Redux DevTools for state debugging
- Check browser console for errors
- Use network tab for API debugging

### Backend Debugging
- Use console.log for simple debugging
- Use debugger statements with Node.js inspector
- Check server logs for errors
- Use Postman for API testing

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images and assets
- Use code splitting

### Backend
- Implement proper database indexing
- Use compression middleware
- Implement caching strategies
- Optimize file upload handling

## Security Considerations

### Frontend
- Validate all user inputs
- Sanitize data before display
- Use HTTPS in production
- Implement proper error handling

### Backend
- Use helmet for security headers
- Implement rate limiting
- Validate and sanitize inputs
- Use secure file upload practices
- Implement proper authentication

## Deployment

### Development Deployment
```bash
npm run build:all
npm run start:prod
```

### Production Deployment
1. Set production environment variables
2. Build applications
3. Deploy to hosting service
4. Configure reverse proxy (nginx)
5. Set up SSL certificates

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT in .env file
   - Kill existing processes

2. **MongoDB connection failed**
   - Check MongoDB is running
   - Verify connection string
   - Check network connectivity

3. **File upload fails**
   - Check file size limits
   - Verify upload directory permissions
   - Check disk space

4. **Build fails**
   - Clear node_modules and reinstall
   - Check for syntax errors
   - Verify all dependencies

### Getting Help

1. Check the console for error messages
2. Review the logs for detailed information
3. Search existing issues in the repository
4. Create a new issue with detailed information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Pull Request Guidelines

- Provide clear description of changes
- Include screenshots for UI changes
- Ensure code follows style guidelines
- Add tests for new functionality
- Update documentation if needed

## Resources

- [React Documentation](https://reactjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)