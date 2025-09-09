import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../store/slices/fileSlice';
import { addNotification } from '../../store/slices/notificationSlice';

const FileUpload = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (files.length === 0) return;

    setUploading(true);
    
    try {
      for (const file of files) {
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          dispatch(addNotification({
            type: 'error',
            message: `File ${file.name} is too large. Maximum size is 10MB.`
          }));
          continue;
        }

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        formData.append('size', file.size);
        formData.append('type', file.type);

        // Dispatch upload action
        await dispatch(uploadFile(formData)).unwrap();
        
        dispatch(addNotification({
          type: 'success',
          message: `File ${file.name} uploaded successfully!`
        }));
      }
      
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.message || 'Failed to upload file'
      }));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin mx-auto w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <p className="text-sm text-gray-600">Uploading files...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {isDragging ? 'Drop files here' : 'Drag and drop files here'}
              </p>
              <p className="text-sm text-gray-500">
                or <span className="text-blue-500 hover:text-blue-600">browse files</span>
              </p>
              <p className="text-xs text-gray-400">
                Maximum file size: 10MB
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;