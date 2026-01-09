import React, { useState } from 'react';
import { createUser } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; age?: string }>({});

  const validate = () => {
    const e: { name?: string; email?: string; age?: string } = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.age.toString().trim()) e.age = 'Age is required.';
    else if (Number.isNaN(Number(form.age)) || Number(form.age) <= 0) e.age = 'Enter a valid age.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const payload = { name: form.name, email: form.email, age: Number(form.age) };
      await createUser(payload);
      navigate('/users');
    } catch (err) {
      console.error('Create failed', err);
      alert('Failed to create user');
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8">
          <Link to="/users" className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 text-sm md:text-base w-full sm:w-auto justify-center sm:justify-start">
            ← Back to Users
          </Link>
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
          >
            Save User
          </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">Create New User</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input 
                value={form.name} 
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 text-sm md:text-base ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter user's name"
              />
              {errors.name && <p className="mt-2 text-red-500 text-xs md:text-sm font-medium">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input 
                value={form.email} 
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 text-sm md:text-base ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter email address"
                type="email"
              />
              {errors.email && <p className="mt-2 text-red-500 text-xs md:text-sm font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</label>
              <input 
                type="number" 
                value={form.age} 
                onChange={e => setForm(f => ({ ...f, age: e.target.value }))} 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 text-sm md:text-base ${
                  errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter age"
              />
              {errors.age && <p className="mt-2 text-red-500 text-xs md:text-sm font-medium">{errors.age}</p>}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
