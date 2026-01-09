import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../services/api';
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; age?: string }>({});

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id!);
      setUser(data);
      setForm({ name: data.name || '', email: data.email || '', age: String(data.age || '') });
    };
    fetchUser();
  }, [id]);

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="p-4 md:p-8">
      {user ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8">
            <Link to="/users" className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 text-sm md:text-base w-full sm:w-auto justify-center sm:justify-start">
              ← Back to Users
            </Link>
            <button
              onClick={async () => {
                if (isEditing) {
                  if (!validate()) return;
                  try {
                    const payload = { name: form.name, email: form.email, age: Number(form.age) };
                    const updated = await updateUser(id!, payload);
                    setUser(updated);
                    setIsEditing(false);
                    setErrors({});
                  } catch (err) {
                    console.error('Update failed', err);
                    alert('Failed to save user');
                  }
                } else {
                  setIsEditing(true);
                }
              }}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
            >
              {isEditing ? '✓ Save' : '✎ Edit'}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 md:w-24 h-16 md:h-24 bg-white dark:bg-gray-200 rounded-full text-2xl md:text-4xl font-bold text-blue-600 mb-4 shadow-lg">
                {getInitials(user.name)}
              </div>
              {isEditing ? (
                <div>
                  <input
                    className={`w-full px-4 py-2 text-base md:text-2xl font-bold text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                  {errors.name && <p className="mt-2 text-red-500 text-xs md:text-sm">{errors.name}</p>}
                </div>
              ) : (
                <>
                  <h1 className="text-2xl md:text-4xl font-bold text-white">{user.name}</h1>
                  <p className="text-blue-100 mt-2 text-sm md:text-base">User Profile</p>
                </>
              )}
            </div>

            <div className="p-4 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <label className="text-xs md:text-sm font-semibold text-gray-200 dark:text-gray-300 mb-1 md:mb-0">Email Address</label>
                {isEditing ? (
                  <div className="w-full md:w-3/4">
                    <input
                      type="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 text-sm md:text-base ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    {errors.email && <p className="mt-2 text-red-500 text-xs md:text-sm font-medium">{errors.email}</p>}
                  </div>
                ) : (
                  <p className="text-base md:text-lg text-gray-100 dark:text-gray-200 break-words md:ml-4">{user.email}</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <label className="text-xs md:text-sm font-semibold text-gray-200 dark:text-gray-300 mb-1 md:mb-0">Age</label>
                {isEditing ? (
                  <div className="w-full md:w-3/4">
                    <input
                      type="number"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 text-sm md:text-base ${
                        errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      value={form.age}
                      onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                    />
                    {errors.age && <p className="mt-2 text-red-500 text-xs md:text-sm font-medium">{errors.age}</p>}
                  </div>
                ) : (
                  <p className="text-base md:text-lg text-gray-100 dark:text-gray-200 md:ml-4">{user.age} years old</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">Loading user profile...</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserProfile;