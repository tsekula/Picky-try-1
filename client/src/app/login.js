'use client';
import React from 'react';
import SignIn from '../components/SignIn';

export default function Login() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
      <SignIn />
    </div>
  );
}
