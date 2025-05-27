'use client';
import { useEffect, useState } from 'react';

export default function DataDisplayPage() {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', age: '', gender: '', message: '' });

  const fetchEntries = async () => {
    const res = await fetch('https://full-stack-app-88ue.onrender.com/api/data');
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://full-stack-app-88ue.onrender.com/api/data/${id}`, { method: 'DELETE' });
    fetchEntries();
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditData({
      name: entry.name,
      email: entry.email,
      age: entry.age,
      gender: entry.gender,
      message: entry.message,
    });
  };

  const handleUpdate = async () => {
    await fetch(`https://full-stack-app-88ue.onrender.com/api/data/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });
    setEditingId(null);
    fetchEntries();
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Submitted Data</h1>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                {editingId === entry.id ? (
                  <>
                    <td className="border px-2 py-1">
                      <input name="name" value={editData.name} onChange={handleChange} className="border p-1 rounded w-full" />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="email" value={editData.email} onChange={handleChange} className="border p-1 rounded w-full" />
                    </td>
                    <td className="border px-2 py-1">
                      <input name="age" value={editData.age} onChange={handleChange} className="border p-1 rounded w-full" />
                    </td>
                    <td className="border px-2 py-1">
                      <select name="gender" value={editData.gender} onChange={handleChange} className="border p-1 rounded w-full">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                    <td className="border px-2 py-1">
                      <input name="message" value={editData.message} onChange={handleChange} className="border p-1 rounded w-full" />
                    </td>
                    <td className="border px-2 py-1">
                      <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-2">Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{entry.name}</td>
                    <td className="border px-4 py-2">{entry.email}</td>
                    <td className="border px-4 py-2">{entry.age}</td>
                    <td className="border px-4 py-2">{entry.gender}</td>
                    <td className="border px-4 py-2">{entry.message}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleEdit(entry)} className="bg-yellow-500 text-white px-2 py-1 rounded text-xs mr-2">Edit</button>
                      <button onClick={() => handleDelete(entry.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
