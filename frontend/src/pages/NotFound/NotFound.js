import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Go Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link
              to="/files"
              className="text-primary-600 hover:text-primary-700 mx-2"
            >
              Browse Files
            </Link>
            |
            <Link
              to="/dashboard"
              className="text-primary-600 hover:text-primary-700 mx-2"
            >
              Dashboard
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-gray-400">
          <svg
            className="mx-auto h-24 w-24 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.935-6.072-2.456M15 21H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-sm">Elite Filing - File Management System</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;