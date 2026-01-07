import React, { useEffect, useState } from 'react';
import { getUserById } from '../../services/api';
import { useParams, Link } from 'react-router-dom';
import styles from '../../css/UserProfile.module.css';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id!);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <Link to="/users" className={styles.backButton}>
            ← Back to Users
          </Link>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                {getInitials(user.name)}
              </div>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.title}>User Profile</p>
            </div>
            
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>Email Address</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{user.age} years</td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td>{user._id}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading user profile...</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;