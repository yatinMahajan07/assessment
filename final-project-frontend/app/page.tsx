'use client';
import { useState } from 'react';
import NavBar from './(components)/NavBar';

export default function Page() {
  const [formData, setFormData] = useState({ fullName: '', email: '', age: '', gender: '', feedback: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <NavBar />
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Feedback Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="p-2 border rounded w-full" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-2 border rounded w-full" />
            <input name="age" type="number" placeholder="Age" onChange={handleChange} required className="p-2 border rounded w-full" />
            <select name="gender" onChange={handleChange} required className="p-2 border rounded w-full">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <textarea name="feedback" placeholder="Feedback" rows={3} onChange={handleChange} className="p-2 border rounded w-full" />
          <div className="text-center">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      </div>
    </div>
  );
}
