import React, { useEffect, useState } from 'react';
import { getUserById, updateUser as updateUserAPI, uploadAvatar as uploadAvatarAPI } from '../../services/api';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentUser, updateUser, setLoading } from '../../store/slices/userSlice';
import { validateUserForm, hasErrors, ValidationErrors } from '../../utils/validation';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    try {
      dispatch(setLoading(true));
      const updated = await uploadAvatarAPI(id, file);
      setUser(updated);
      dispatch(updateUser(updated));
    } catch (err) {
      console.error('Avatar upload failed', err);
      alert('Failed to upload avatar');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getUserById(id!);
        setUser(data);
        dispatch(setCurrentUser(data));
        setForm({ name: data.name || '', email: data.email || '', age: String(data.age || '') });
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    if (id) fetchUser();
  }, [id, dispatch]);

  const handleSave = async () => {
    const validationErrors = validateUserForm({
      name: form.name,
      email: form.email,
      age: form.age,
    });

    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    try {
      dispatch(setLoading(true));
      const payload = { name: form.name, email: form.email, age: Number(form.age) };
      const updated = await updateUserAPI(id!, payload);
      setUser(updated);
      dispatch(updateUser(updated));
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to save user');
    } finally {
      dispatch(setLoading(false));
    }
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
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
            >
              {isEditing ? '✓ Save' : '✎ Edit'}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 md:p-12 text-center">
              <div className="relative inline-block mb-4">
                {user.avatar?.data && user.avatar?.contentType ? (
                  <img
                    src={`data:${user.avatar.contentType};base64,${user.avatar.data}`}
                    alt={user.name}
                    className="w-16 md:w-24 h-16 md:h-24 rounded-full object-cover shadow-lg border-4 border-white"
                  />
                ) : (
                  <div className="inline-flex items-center justify-center w-16 md:w-24 h-16 md:h-24 bg-white dark:bg-gray-200 rounded-full text-2xl md:text-4xl font-bold text-blue-600 shadow-lg">
                    {getInitials(user.name)}
                  </div>
                )}
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    title="Upload avatar"
                  >
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
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