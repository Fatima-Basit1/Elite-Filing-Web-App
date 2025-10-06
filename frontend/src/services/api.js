import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { addNotification } from '../store/slices/notificationSlice';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle different error status codes
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem('token');
          store.dispatch(logout());
          store.dispatch(
            addNotification({
              type: 'error',
              title: 'Session Expired',
              message: 'Please log in again to continue.',
            })
          );
          break;
          
        case 403:
          // Forbidden
          store.dispatch(
            addNotification({
              type: 'error',
              title: 'Access Denied',
              message: 'You do not have permission to perform this action.',
            })
          );
          break;
          
        case 404:
          // Not found
          store.dispatch(
            addNotification({
              type: 'error',
              title: 'Not Found',
              message: 'The requested resource was not found.',
            })
          );
          break;
          
        case 422:
          // Validation error
          const validationErrors = response.data.errors;
          if (validationErrors && Array.isArray(validationErrors)) {
            validationErrors.forEach((err) => {
              store.dispatch(
                addNotification({
                  type: 'error',
                  title: 'Validation Error',
                  message: err.msg || err.message,
                })
              );
            });
          }
          break;
          
        case 429:
          // Too many requests
          store.dispatch(
            addNotification({
              type: 'warning',
              title: 'Rate Limit Exceeded',
              message: 'Too many requests. Please try again later.',
            })
          );
          break;
          
        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          store.dispatch(
            addNotification({
              type: 'error',
              title: 'Server Error',
              message: 'Something went wrong on our end. Please try again later.',
            })
          );
          break;
          
        default:
          // Other errors
          store.dispatch(
            addNotification({
              type: 'error',
              title: 'Error',
              message: response.data?.message || 'An unexpected error occurred.',
            })
          );
      }
    } else if (error.request) {
      // Network error
      store.dispatch(
        addNotification({
          type: 'error',
          title: 'Network Error',
          message: 'Unable to connect to the server. Please check your internet connection.',
        })
      );
    } else {
      // Other error
      store.dispatch(
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'An unexpected error occurred.',
        })
      );
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const apiMethods = {
  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/signup', userData),
    logout: () => api.post('/auth/logout'),
    forgotPassword: (data) => api.post('/auth/forgot-password', data),
    resetPassword: (data) => api.post('/auth/reset-password', data),
  },
  
  // User endpoints
  users: {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    getUsers: () => api.get('/users'),
    deleteUser: (id) => api.delete(`/users/${id}`),
  },
  
  // File endpoints
  files: {
    getFiles: (params) => api.get('/files', { params }),
    getFile: (id) => api.get(`/files/${id}`),
    createFile: (data) => api.post('/files', data),
    updateFile: (id, data) => api.put(`/files/${id}`, data),
    deleteFile: (id) => api.delete(`/files/${id}`),
  },

  // Form submission endpoints
  submissions: {
    submitTrademarkUK: (data) => api.post('/trademark-requests', data),
    submitUKSharedOffice: (data) => api.post('/uk-shared-office-requests', data),
    submitRegisteredAgent: (data) => api.post('/registered-agent-requests', data),
    submitUSLLCFormation: (data) => api.post('/us-llc-formation-requests', data),
    submitUSTaxFiling: (data) => api.post('/us-tax-filing-requests', data),
    submitITINRequest: (data) => api.post('/itin-requests', data),
    submitUKCompanyRegistration: (data) => api.post('/uk-company-registration-requests', data),
    submitUKAnnualAccounts: (data) => api.post('/uk-annual-accounts-requests', data),
    submitUKCompanyNameChange: (data) => api.post('/uk-company-name-change-requests', data),
    submitUKStructureChange: (data) => api.post('/uk-structure-change-requests', data),
    submitUKConfirmationStatement: (data) => api.post('/uk-confirmation-statement-requests', data),
    submitUKEoriApplication: (data) => api.post('/uk-eori-application-requests', data),
    submitUKVATReturn: (data) => api.post('/uk-vat-return-requests', data),
    submitUKBankAccount: (data) => api.post('/uk-bank-account-requests', data),
    submitUKVATRegistration: (data) => api.post('/uk-vat-registration-requests', data),
  },
};

export default api;