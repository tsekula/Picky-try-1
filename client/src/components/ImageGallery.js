import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserImages } from '../utils/api';
import ImageUpload from './ImageUpload';
import MasonryGallery from './MasonryGallery';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadImages = async () => {
      if (!user || !user.id) {
        console.error('User ID is missing');
        return;
      }
      try {
        console.log("token is ", localStorage.getItem('token'));
        setLoading(true);
        const userImages = await getUserImages(user.id);
        setImages(userImages.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)));
      } catch (error) {
        console.error('Error fetching user images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [user]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search images..."
        className="w-full px-3 py-2 border rounded-md mb-4"
      />
      <ImageUpload onUpload={(newImage) => setImages([newImage, ...images])} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MasonryGallery images={images} />
      )}
    </div>
  );
}
