import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiTrash2, FiEdit2, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ViewStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get('http://localhost:5000/api/admin/users?role=student', config);
            setStudents(res.data);
        } catch (err) { 
            console.error(err);
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { fetchStudents(); }, [user.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this student?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
                fetchStudents();
            } catch { 
                alert('Error deleting'); 
            }
        }
    };

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div style={{ color: 'var(--text-primary)', padding: '40px', textAlign: 'center' }}>Loading students...</div>;

    return (
        <div>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Manage Students</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>{students.length} students registered.</p>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', boxShadow: 'var(--shadow)', padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px', width: '300px' }}
                    />
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--glass-border)' }}>
                                {['Name', 'Email', 'Department', 'Class', 'Student ID', 'Year', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--admin-primary)' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-light)' }}>No students found.</td></tr>
                            ) : filtered.map(s => (
                                <tr key={s._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)' }}>{s.name}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{s.email}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{s.department?.name || s.department || 'N/A'}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{s.assignedClass?.name || 'N/A'}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{s.studentId || '—'}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{s.year || '—'}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => navigate(`/admin/students/profile/${s._id}`)} title="View Profile" style={{ border: 'none', background: 'none', color: '#4e73df', cursor: 'pointer', fontSize: '18px' }}><FiUser /></button>
                                            <button title="Edit" style={{ border: 'none', background: 'none', color: '#f6c23e', cursor: 'pointer', fontSize: '18px' }}><FiEdit2 /></button>
                                            <button onClick={() => handleDelete(s._id)} title="Delete" style={{ border: 'none', background: 'none', color: '#e74a3b', cursor: 'pointer', fontSize: '18px' }}><FiTrash2 /></button>
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

export default ViewStudents;

