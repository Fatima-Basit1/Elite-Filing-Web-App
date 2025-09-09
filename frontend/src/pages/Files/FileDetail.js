import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { downloadFile, deleteFile } from '../../store/slices/fileSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import { sampleFiles } from '../../data/sampleData';

const FileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.files);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from API
    const foundFile = sampleFiles.find(f => f.id === id) || files.find(f => f.id === id);
    setFile(foundFile);
    setLoading(false);
  }, [id, files]);

  const handleDownload = () => {
    if (file) {
      dispatch(downloadFile(file.id));
      dispatch(addNotification({
        type: 'success',
        message: `Downloading ${file.name}...`
      }));
    }
  };

  const handleDelete = () => {
    if (file && window.confirm('Are you sure you want to delete this file?')) {
      dispatch(deleteFile(file.id));
      dispatch(addNotification({
        type: 'success',
        message: `${file.name} deleted successfully`
      }));
      navigate('/files');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    const iconMap = {
      'image': '🖼️',
      'document': '📄',
      'video': '🎥',
      'audio': '🎵',
      'archive': '📦',
      'code': '💻'
    };
    return iconMap[type] || '📄';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">File Not Found</h2>
        <p className="text-gray-600 mb-6">The file you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/files')}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Files
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/files')}
          className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
        >
          ← Back to Files
        </button>
        <h1 className="text-3xl font-bold text-gray-900">File Details</h1>
      </div>

      {/* File Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="text-4xl mr-4">
              {getFileIcon(file.type)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{file.name}</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Size:</span> {formatFileSize(file.size)}</p>
                <p><span className="font-medium">Type:</span> {file.type}</p>
                <p><span className="font-medium">Uploaded:</span> {new Date(file.uploadDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Modified:</span> {new Date(file.modifiedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={handleDownload}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              📥 Download
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* File Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        
        {file.type === 'image' ? (
          <div className="text-center">
            <div className="bg-gray-100 rounded-lg p-8 inline-block">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-gray-600">Image Preview</p>
              <p className="text-sm text-gray-500 mt-2">{file.name}</p>
            </div>
          </div>
        ) : file.type === 'document' ? (
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-gray-600">Document Preview</p>
              <p className="text-sm text-gray-500 mt-2">{file.name}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">{getFileIcon(file.type)}</div>
            <p className="text-gray-600">Preview not available for this file type</p>
            <p className="text-sm text-gray-500 mt-2">Click download to view the file</p>
          </div>
        )}
      </div>

      {/* File Properties */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
            <p className="text-gray-900">{file.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
            <p className="text-gray-900">{formatFileSize(file.size)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
            <p className="text-gray-900 capitalize">{file.type}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date</label>
            <p className="text-gray-900">{new Date(file.uploadDate).toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
            <p className="text-gray-900">{new Date(file.modifiedDate).toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File ID</label>
            <p className="text-gray-900 font-mono text-sm">{file.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetail;