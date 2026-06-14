"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CMSContext } from '@/context/CMSContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(CMSContext);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Kredensial tidak valid');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col justify-center items-center px-4 font-sans text-[#1A1A1A]">
      <div className="w-full max-w-md bg-white border border-[#1A1A1A] p-8">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase tracking-widest">
          Admin Login
        </h2>
        {error && <p className="text-red-600 mb-4 text-sm text-center font-medium">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm uppercase tracking-wide font-bold">Username</label>
            <input 
              type="text" 
              className="w-full p-3 border border-[#1A1A1A] bg-white focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-shadow" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm uppercase tracking-wide font-bold">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-[#1A1A1A] bg-white focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-shadow" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-[#1A1A1A] text-[#F9F8F6] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
            <button onClick={() => router.push('/')} className="px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-[#F9F8F6] transition-colors">
              Kembali ke Website
            </button>
        </div>
      </div>
    </div>
  );
}
