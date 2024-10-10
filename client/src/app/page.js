'use client';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SignIn from '../components/SignIn';
import ImageGallery from '../components/ImageGallery';
import SignOut from '../components/SignOut';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {user && (
        <div className="flex justify-end mb-4">
          <SignOut />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8 text-center">Picky Image Gallery</h1>
      {user ? <ImageGallery /> : <SignIn />}
    </div>
  );
}
