import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

const ViewClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();

    const fetchClasses = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get('http://localhost:5000/api/classes', config);
            setClasses(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchClasses(); }, [user.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this class?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/classes/${id}`, config);
                fetchClasses();
            } catch { alert('Error deleting'); }
        }
    };

    const filtered = classes.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.department?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div style={{ color: 'var(--text-primary)', padding: '40px', textAlign: 'center' }}>Loading classes...</div>;

    return (
        <div>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>View All Classes</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>{classes.length} classes registered.</p>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', boxShadow: 'var(--shadow)', padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <input
                        type="text"
                        placeholder="Search by name or department..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px', width: '300px' }}
                    />
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--glass-border)' }}>
                                {['Class Name', 'Department', 'Year', 'Section', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--admin-primary)' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-light)' }}>No classes found.</td></tr>
                            ) : filtered.map(c => (
                                <tr key={c._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)' }}>{c.name}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{c.department || 'N/A'}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{c.year || '—'}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                        <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#e0e7ff', color: '#4338ca', fontWeight: '600', fontSize: '12px' }}>{c.section || '—'}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button title="Edit" style={{ border: 'none', background: 'none', color: '#f6c23e', cursor: 'pointer', fontSize: '18px' }}><FiEdit2 /></button>
                                            <button onClick={() => handleDelete(c._id)} title="Delete" style={{ border: 'none', background: 'none', color: '#e74a3b', cursor: 'pointer', fontSize: '18px' }}><FiTrash2 /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewClasses;
