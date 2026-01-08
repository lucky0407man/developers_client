import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/Users.module.css';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

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
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
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