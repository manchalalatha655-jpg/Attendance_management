import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiPlus, FiTrash2, FiActivity, FiBriefcase } from 'react-icons/fi';

const ManageDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchDepartments = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get('http://localhost:5000/api/admin/departments', config);
            setDepartments(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchDepartments(); }, [user.token]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/admin/departments', { name, description }, config);
            setName('');
            setDescription('');
            fetchDepartments();
        } catch (err) { alert('Error adding department'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this department?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/admin/departments/${id}`, config);
            fetchDepartments();
        } catch (err) { alert('Error deleting department'); }
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>Department Management</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Create and manage academic departments.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Add Form */}
                <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', boxShadow: 'var(--shadow)', height: 'fit-content' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiPlus style={{ color: 'var(--primary-blue)' }} /> Add New Dept
                    </h3>
                    <form onSubmit={handleAdd}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Dept Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="e.g. Computer Science"
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Description</label>
                            <textarea 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                                placeholder="Optional details..."
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', minHeight: '80px' }}
                            />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '12px', background: 'var(--blue-gradient)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}>
                            Register Department
                        </button>
                    </form>
                </div>

                {/* List */}
                <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiBriefcase style={{ color: 'var(--primary-blue)' }} /> Registered Departments
                    </h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {departments.map(dept => (
                                <div key={dept._id} style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '16px' }}>{dept.name}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-light)', marginTop: '4px' }}>{dept.description || 'No description provided'}</div>
                                    </div>
                                    <button onClick={() => handleDelete(dept._id)} style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.05)', border: 'none', borderRadius: '8px', color: 'var(--accent-red)', cursor: 'pointer' }}>
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            {departments.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '40px' }}>No departments registered yet.</p>}
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default ManageDepartments;
