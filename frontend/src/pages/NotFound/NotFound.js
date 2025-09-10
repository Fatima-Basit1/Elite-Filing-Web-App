import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-24">
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          {/* 404 Icon */}
          <svg
            className="mx-auto h-24 w-24 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.935-6.072-2.456M15 21H9a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2z"
            />
          </svg>
          
          <h1 className="mt-6 text-6xl font-bold text-white">404</h1>
          <h2 className="mt-2 text-3xl font-bold text-white">Page not found</h2>
          <p className="mt-4 text-lg text-gray-200">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
          >
            Go back home
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NotFound;