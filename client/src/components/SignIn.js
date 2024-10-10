import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error, data } = await signIn({ email, password });
      if (error) throw error;
      setUser({ ...data.user, token: data.session.access_token });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />
      <button type="submit" className="w-full px-3 py-2 text-white bg-green-500 rounded-md">Sign In</button>
    </form>
  );
}
