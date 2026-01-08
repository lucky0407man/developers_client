import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getUsers, deleteUser, updateUser } from '../../services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/Users.module.css';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSave = useCallback(async () => {
    if (!editingUserId || !editingField) return;
    try {
      const updatedUser = await updateUser(editingUserId, { [editingField]: tempValue });
      setUsers(prev => prev.map(u => u._id === editingUserId ? updatedUser : u));
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
  }, [editingUserId, editingField, tempValue]);

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

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
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
          autoFocus
        />
      );
    }
    return <span onDoubleClick={() => handleDoubleClick(user._id, field, user[field])}>{user[field]}</span>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Users</h2>
        <button className={styles.createButton} onClick={handleCreate}>Create</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{renderCell(user, 'name')}</td>
              <td>{renderCell(user, 'email')}</td>
              <td>{renderCell(user, 'age')}</td>
              <td>
                <Link to={`/users/${user._id}`} className={styles.profileLink}>View Profile</Link>
              </td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;