'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Display() {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({});

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedData({ ...data[index] });
  };

  const handleSave = (index: number) => {
    const updatedData = [...data];
    updatedData[index] = editedData;
    setData(updatedData);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleChange = (e: any) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <nav className="bg-purple-700 text-white py-3 px-6 flex gap-6 text-lg font-semibold">
        <Link href="/" className="hover:underline">Form</Link>
        <Link href="/display" className="hover:underline">Data</Link>
      </nav>

      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Submitted Data</h1>
        <table className="w-full border border-gray-400 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Feedback</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry: any, index: number) => (
              <tr key={index} className="text-sm">
                {editingIndex === index ? (
                  <>
                    <td className="border border-gray-300 px-2 py-1"><input name="fullName" value={editedData.fullName} onChange={handleChange} className="w-full border p-1" /></td>
                    <td className="border border-gray-300 px-2 py-1"><input name="email" value={editedData.email} onChange={handleChange} className="w-full border p-1" /></td>
                    <td className="border border-gray-300 px-2 py-1"><input name="age" value={editedData.age} onChange={handleChange} className="w-full border p-1" /></td>
                    <td className="border border-gray-300 px-2 py-1"><input name="gender" value={editedData.gender} onChange={handleChange} className="w-full border p-1" /></td>
                    <td className="border border-gray-300 px-2 py-1"><input name="feedback" value={editedData.feedback} onChange={handleChange} className="w-full border p-1" /></td>
                    <td className="border border-gray-300 px-2 py-1">
                      <button onClick={() => handleSave(index)} className="text-green-600 font-semibold hover:underline">Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 px-2 py-1">{entry.fullName}</td>
                    <td className="border border-gray-300 px-2 py-1">{entry.email}</td>
                    <td className="border border-gray-300 px-2 py-1">{entry.age}</td>
                    <td className="border border-gray-300 px-2 py-1">{entry.gender}</td>
                    <td className="border border-gray-300 px-2 py-1">{entry.feedback}</td>
                    <td className="border border-gray-300 px-2 py-1 space-x-2">
                      <button onClick={() => handleEdit(index)} className="text-blue-600 font-semibold hover:underline">Edit</button>
                      <button onClick={() => handleDelete(index)} className="text-red-600 font-semibold hover:underline">Delete</button>
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
