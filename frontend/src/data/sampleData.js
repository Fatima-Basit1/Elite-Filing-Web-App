// Sample data for development and testing purposes

export const sampleUser = {
  _id: '507f1f77bcf86cd799439011',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null,
  createdAt: '2024-01-15T10:30:00.000Z',
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: false
    }
  },
  storage: {
    used: 2147483648, // 2GB in bytes
    limit: 10737418240 // 10GB in bytes
  }
};

export const sampleFiles = [
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Project Proposal.pdf',
    originalName: 'Project Proposal.pdf',
    type: 'application/pdf',
    size: 2048576, // 2MB
    path: '/uploads/507f1f77bcf86cd799439012.pdf',
    uploadDate: '2024-01-20T14:30:00.000Z',
    category: 'document',
    tags: ['work', 'proposal'],
    isPublic: false,
    downloadCount: 5
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'vacation-photo.jpg',
    originalName: 'IMG_20240115_143022.jpg',
    type: 'image/jpeg',
    size: 1536000, // 1.5MB
    path: '/uploads/507f1f77bcf86cd799439013.jpg',
    uploadDate: '2024-01-19T09:15:00.000Z',
    category: 'image',
    tags: ['personal', 'vacation'],
    isPublic: true,
    downloadCount: 2
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'presentation.pptx',
    originalName: 'Q4 Results Presentation.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: 5242880, // 5MB
    path: '/uploads/507f1f77bcf86cd799439014.pptx',
    uploadDate: '2024-01-18T16:45:00.000Z',
    category: 'document',
    tags: ['work', 'presentation', 'q4'],
    isPublic: false,
    downloadCount: 12
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'demo-video.mp4',
    originalName: 'Product Demo Recording.mp4',
    type: 'video/mp4',
    size: 15728640, // 15MB
    path: '/uploads/507f1f77bcf86cd799439015.mp4',
    uploadDate: '2024-01-17T11:20:00.000Z',
    category: 'video',
    tags: ['work', 'demo', 'product'],
    isPublic: false,
    downloadCount: 8
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'budget-spreadsheet.xlsx',
    originalName: '2024 Budget Planning.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1048576, // 1MB
    path: '/uploads/507f1f77bcf86cd799439016.xlsx',
    uploadDate: '2024-01-16T13:10:00.000Z',
    category: 'document',
    tags: ['work', 'budget', 'finance'],
    isPublic: false,
    downloadCount: 3
  },
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'family-photo.png',
    originalName: 'Family Reunion 2024.png',
    type: 'image/png',
    size: 3145728, // 3MB
    path: '/uploads/507f1f77bcf86cd799439017.png',
    uploadDate: '2024-01-15T18:30:00.000Z',
    category: 'image',
    tags: ['personal', 'family'],
    isPublic: true,
    downloadCount: 1
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'contract.docx',
    originalName: 'Service Agreement Contract.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 512000, // 500KB
    path: '/uploads/507f1f77bcf86cd799439018.docx',
    uploadDate: '2024-01-14T10:45:00.000Z',
    category: 'document',
    tags: ['work', 'legal', 'contract'],
    isPublic: false,
    downloadCount: 7
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'music-track.mp3',
    originalName: 'Favorite Song.mp3',
    type: 'audio/mpeg',
    size: 4194304, // 4MB
    path: '/uploads/507f1f77bcf86cd799439019.mp3',
    uploadDate: '2024-01-13T20:15:00.000Z',
    category: 'audio',
    tags: ['personal', 'music'],
    isPublic: true,
    downloadCount: 0
  }
];

export const sampleStats = {
  totalFiles: sampleFiles.length,
  totalSize: sampleFiles.reduce((sum, file) => sum + file.size, 0),
  categories: {
    document: sampleFiles.filter(f => f.category === 'document').length,
    image: sampleFiles.filter(f => f.category === 'image').length,
    video: sampleFiles.filter(f => f.category === 'video').length,
    audio: sampleFiles.filter(f => f.category === 'audio').length,
    other: sampleFiles.filter(f => !['document', 'image', 'video', 'audio'].includes(f.category)).length
  },
  recentFiles: sampleFiles
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, 5),
  popularFiles: sampleFiles
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 5)
};

export const sampleNotifications = [
  {
    id: '1',
    type: 'success',
    message: 'File uploaded successfully',
    timestamp: Date.now() - 5000
  },
  {
    id: '2',
    type: 'info',
    message: 'Storage usage: 2GB of 10GB used',
    timestamp: Date.now() - 300000
  },
  {
    id: '3',
    type: 'warning',
    message: 'Approaching storage limit',
    timestamp: Date.now() - 3600000
  }
];

// Helper functions for working with sample data
export const getFilesByCategory = (category) => {
  return sampleFiles.filter(file => file.category === category);
};

export const getFilesByTag = (tag) => {
  return sampleFiles.filter(file => file.tags.includes(tag));
};

export const searchFiles = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return sampleFiles.filter(file => 
    file.name.toLowerCase().includes(lowercaseQuery) ||
    file.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getStoragePercentage = () => {
  return Math.round((sampleUser.storage.used / sampleUser.storage.limit) * 100);
};

// Mock API responses
export const mockApiResponses = {
  login: {
    success: true,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    user: sampleUser
  },
  register: {
    success: true,
    message: 'User registered successfully',
    user: sampleUser
  },
  files: {
    success: true,
    files: sampleFiles,
    pagination: {
      page: 1,
      limit: 20,
      total: sampleFiles.length,
      pages: 1
    }
  },
  upload: {
    success: true,
    message: 'File uploaded successfully',
    file: sampleFiles[0]
  },
  delete: {
    success: true,
    message: 'File deleted successfully'
  }
};