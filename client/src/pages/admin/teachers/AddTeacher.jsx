import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const AddTeacher = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', department: '', qualification: '', password: ''
    });
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/admin/teachers-manage', formData, config);
            setMessage('success:Teacher added successfully!');
            setFormData({ name: '', email: '', phone: '', department: '', qualification: '', password: '' });
        } catch (err) {
            setMessage('error:' + (err.response?.data?.message || err.message));
        }
    };

    const isError = message.startsWith('error:');
    const msgText = message.replace(/^(success:|error:)/, '');

    return (
        <div style={{ maxWidth: '620px' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>
                Add New Teacher
            </h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>
                Fill in the details below to register a new teacher.
            </p>

            {message && (
                <div style={{
                    padding: '12px 16px',
                    background: isError ? '#fee2e2' : '#dcfce7',
                    color: isError ? '#991b1b' : '#166534',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    fontSize: '14px',
                    borderLeft: `4px solid ${isError ? '#ef4444' : '#22c55e'}`
                }}>
                    {msgText}
                </div>
            )}

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {[
                        { label: 'Full Name', key: 'name', type: 'text', placeholder: 'e.g. Dr. John Smith' },
                        { label: 'Email Address', key: 'email', type: 'email', placeholder: 'e.g. john@college.edu' },
                        { label: 'Phone Number', key: 'phone', type: 'text', placeholder: 'e.g. +91 9876543210' },
                        { label: 'Department', key: 'department', type: 'text', placeholder: 'e.g. Computer Science' },
                        { label: 'Qualification', key: 'qualification', type: 'text', placeholder: 'e.g. M.Tech, Ph.D' },
                        { label: 'Password', key: 'password', type: 'password', placeholder: 'Set a strong password' },
                    ].map(({ label, key, type, placeholder }) => (
                        <div key={key}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                {label}
                            </label>
                            <input
                                type={type}
                                placeholder={placeholder}
                                value={formData[key]}
                                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                required
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px' }}
                            />
                        </div>
                    ))}
                    <button type="submit" style={{ padding: '12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>
                        Save Teacher
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTeacher;
