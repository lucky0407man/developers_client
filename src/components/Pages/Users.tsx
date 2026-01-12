import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getUsers, deleteUser, updateUser } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUsers, updateUser as updateUserAction, deleteUser as deleteUserAction, setLoading } from '../../store/slices/userSlice';

const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(state => state.user.users);
  
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getUsers();
        dispatch(setUsers(data));
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleSave = useCallback(async () => {
    if (!editingUserId || !editingField) return;
    try {
      const updatedUser = await updateUser(editingUserId, { [editingField]: tempValue });
      dispatch(updateUserAction(updatedUser));
      setEditingUserId(null);
      setEditingField(null);
      setTempValue('');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update user');
      setEditingUserId(null);
      setEditingField(null);
      setTempValue('');
    }
  }, [editingUserId, editingField, tempValue, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingUserId && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        const confirmSave = window.confirm('Do you want to save the changed information?');
        if (confirmSave) {
          handleSave();
        } else {
          setEditingUserId(null);
          setEditingField(null);
          setTempValue('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingUserId, handleSave]);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      dispatch(deleteUserAction(id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete user');
    }
  };

  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleDoubleClick = (userId: string, field: string, value: string) => {
    setEditingUserId(userId);
    setEditingField(field);
    setTempValue(value);
  };

  const renderCell = (user: any, field: string) => {
    const isEditing = editingUserId === user._id && editingField === field;
    if (isEditing) {
      return (
        <input
          ref={inputRef}
          type={field === 'age' ? 'number' : 'text'}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-blue-400 dark:text-white"
          autoFocus
        />
      );
    }
    return (
      <span 
        onDoubleClick={() => handleDoubleClick(user._id, field, user[field])}
        className="cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900 px-2 py-1 rounded transition-colors duration-150"
      >
        {user[field]}
      </span>
    );
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 1);
  };

  const renderAvatar = (user: any) => {
    if (user.avatar?.data && user.avatar?.contentType) {
      return (
        <img
          src={`data:${user.avatar.contentType};base64,${user.avatar.data}`}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
        {getInitials(user.name)}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Users</h2>
          <button 
            onClick={handleCreate}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            + Create User
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
              <tr>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Avatar</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Age</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Profile</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">
                    {renderAvatar(user)}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">
                    {renderCell(user, 'name')}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {renderCell(user, 'email')}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {renderCell(user, 'age')}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                    <Link 
                      to={`/users/${user._id}`} 
                      className="inline-block px-2 md:px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-150 font-medium"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                    <button 
                      onClick={() => handleDelete(user._id)}
                      className="w-full md:w-auto px-2 md:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-150 hover:shadow-lg text-xs md:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Users;