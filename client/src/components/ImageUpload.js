import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Image from 'next/image';

const ImageUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploadedFiles.length === 0) {
      setUploadStatus('Please select at least one file');
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('About to try to set uploaded images');
      setUploadStatus('Files uploaded successfully');
      if (Array.isArray(response.data.fileUrls)) {
        const newImageUrls = response.data.fileUrls;
        console.log('New image URLs:', newImageUrls);
        setUploadedImages(newImageUrls);
      } else {
        console.error('Unexpected response format:', response.data);
        setUploadStatus('Error processing uploaded files');
      }
      setUploadedFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Error uploading files');
    }
  };

  const resetUpload = () => {
    setUploadedFiles([]);
    setUploadStatus('');
    setUploadedImages([]);
  };

  // Clear upload status after 5 seconds
  useEffect(() => {
    if (uploadStatus === 'Files uploaded successfully') {
      const timer = setTimeout(() => {
        setUploadStatus('');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div 
          {...getRootProps()} 
          className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {uploadedFiles.length > 0 && (
          <div>
            <p>{uploadedFiles.length} file(s) selected</p>
            <ul className="list-disc pl-5">
              {uploadedFiles.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>
      {uploadStatus && (
        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">{uploadStatus}</p>
        </div>
      )}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Uploaded Images:</h2>
          <div className="grid grid-cols-3 gap-4">
            {uploadedImages.map((imageUrl, index) => (
              <div key={index} className="relative h-24 w-24">
                <Image
                  src={imageUrl}
                  alt={`Uploaded image ${index + 1}`}
                  width={96}
                  height={96}
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>
          <button
            onClick={resetUpload}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear Uploaded Images
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
