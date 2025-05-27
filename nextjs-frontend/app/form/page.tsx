'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    message: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age || !formData.gender || !formData.message) {
      setError('All fields are required');
      return;
    }
    setError('');
    const res = await fetch('https://full-stack-app-88ue.onrender.com/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (!res.ok) {
      setError(result.message);
    } else {
      const { message, ...rest } = formData;
      const query = new URLSearchParams({ ...rest, comments: message }).toString();
      router.push(`/success?${query}`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto mt-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-700">Feedback Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded-md p-3" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md p-3" />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="border border-gray-300 rounded-md p-3" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="border border-gray-300 rounded-md p-3">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="border border-gray-300 rounded-md p-3" rows={4}></textarea>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 font-medium">Submit</button>
      </form>
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </div>
  );
}