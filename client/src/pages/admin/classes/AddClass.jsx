import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const AddClass = () => {
    const [formData, setFormData] = useState({ name: '', department: '', year: '1st', section: 'A' });
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/classes', formData, config);
            setMessage('success:Class added successfully!');
            setFormData({ name: '', department: '', year: '1st', section: 'A' });
        } catch (err) {
            setMessage('error:' + (err.response?.data?.message || err.message));
        }
    };

    const isError = message.startsWith('error:');
    const msgText = message.replace(/^(success:|error:)/, '');

    const fieldStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px' };
    const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' };

    return (
        <div style={{ maxWidth: '620px' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Add New Class</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>Create a new class with department, year, and section.</p>

            {message && (
                <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', marginBottom: '20px', borderRadius: '8px', fontWeight: '500', fontSize: '14px', borderLeft: `4px solid ${isError ? '#ef4444' : '#22c55e'}` }}>
                    {msgText}
                </div>
            )}

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                        <label style={labelStyle}>Class Name</label>
                        <input type="text" placeholder="e.g. CSE-A" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={fieldStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Department</label>
                        <input type="text" placeholder="e.g. Computer Science" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required style={fieldStyle} />
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Year</label>
                            <select value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} style={fieldStyle}>
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Section</label>
                            <select value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})} style={fieldStyle}>
                                <option value="A">Section A</option>
                                <option value="B">Section B</option>
                                <option value="C">Section C</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" style={{ padding: '12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>
                        Save Class
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddClass;
