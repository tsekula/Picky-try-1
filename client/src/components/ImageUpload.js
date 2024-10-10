import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const ImageUpload = ({ onUpload }) => {
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    for (const file of acceptedFiles) {
      try {
        const uploadedImage = await uploadImage(user.id, file);
        console.log('Uploaded image:', uploadedImage);
        onUpload(uploadedImage);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }, [user.id, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
      'image/tiff': ['.tiff', '.tif'],
      'image/webp': ['.webp']
    },
    multiple: true
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here ...</p>
      ) : (
        <p>Drag 'n' drop some images here, or click to select images</p>
      )}
    </div>
  );
};

export default ImageUpload;
