import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function SignOut() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // The AuthContext will handle the state update
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
    >
      Sign Out
    </button>
  );
}
