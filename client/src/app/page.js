'use client';
import React from 'react';
import ImageUpload from '../components/ImageUpload';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Picky Image Gallery</h1>
      {user ? (
        <ProtectedRoute>
          <ImageUpload />
        </ProtectedRoute>
      ) : (
        <div className="flex space-x-4">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <SignUp />
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <SignIn />
          </div>
        </div>
      )}
    </div>
  );
}
