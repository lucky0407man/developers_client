import React, { useState } from 'react';
import { createUser } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../../css/UserProfile.module.css';

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
    <div className={styles.container}>
      <div className={styles.topRow}>
        <Link to="/users" className={styles.backButton}>← Back to Users</Link>
        <button className={styles.inlineButton} onClick={handleSave}>Save</button>
      </div>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.name}>Create User</h1>
        </div>

        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Name</td>
                <td>
                <input className={errors.name ? styles.inputError : ''} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                {errors.name && <div className={styles.errorText}>{errors.name}</div>}
              </td>
            </tr>
            <tr>
              <td>Email Address</td>
                <td>
                <input className={errors.email ? styles.inputError : ''} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                {errors.email && <div className={styles.errorText}>{errors.email}</div>}
              </td>
            </tr>
            <tr>
              <td>Age</td>
                <td>
                <input className={errors.age ? styles.inputError : ''} type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
                {errors.age && <div className={styles.errorText}>{errors.age}</div>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateUser;
