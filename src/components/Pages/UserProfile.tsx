import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../services/api';
import { useParams, Link } from 'react-router-dom';
import styles from '../../css/UserProfile.module.css';

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
    <div className={styles.container}>
      {user ? (
        <>
          <div className={styles.topRow}>
            <Link to="/users" className={styles.backButton}>
              ← Back to Users
            </Link>
            <button
              className={styles.inlineButton}
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
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className={styles.card}>
              <div className={styles.header}>
              <div className={styles.avatar}>
                {getInitials(user.name)}
              </div>
              {isEditing ? (
                <div style={{ textAlign: 'center' }}>
                  <input
                    className={`${styles.nameInput} ${errors.name ? styles.inputError : ''}`}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                  {errors.name && <div className={styles.errorText}>{errors.name}</div>}
                </div>
              ) : (
                <>
                  <h1 className={styles.name}>{user.name}</h1>
                  <p className={styles.title}>User Profile</p>
                </>
              )}
            </div>
            
              <table className={styles.table}>
              <tbody>
                <tr>
                  <td>Email Address</td>
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          className={errors.email ? styles.inputError : ''}
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        />
                        {errors.email && <div className={styles.errorText}>{errors.email}</div>}
                      </>
                    ) : (
                      user.email
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="number"
                          className={errors.age ? styles.inputError : ''}
                          value={form.age}
                          onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                        />
                        {errors.age && <div className={styles.errorText}>{errors.age}</div>}
                      </>
                    ) : (
                      `${user.age} years`
                    )}
                  </td>
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