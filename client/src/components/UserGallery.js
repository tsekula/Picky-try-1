import React, { useState, useEffect } from 'react';
import { getUserImages } from '../utils/api';

const UserGallery = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const userImages = await getUserImages(userId);
        setImages(userImages);
      } catch (error) {
        console.error('Error fetching user images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img src={image.file_path} alt={image.file_name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGallery;
