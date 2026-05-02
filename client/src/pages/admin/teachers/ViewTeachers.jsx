import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiTrash2, FiEdit2, FiUser, FiSearch, FiFilter, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ViewTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchTeachers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get('http://localhost:5000/api/admin/teachers-manage', config);
            setTeachers(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchTeachers(); }, [user.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this faculty member from the system?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/admin/teachers-manage/${id}`, config);
                fetchTeachers();
            } catch { alert('Error deleting faculty record'); }
        }
    };

    const filtered = teachers.filter(t =>
        t.name?.toLowerCase().includes(search.toLowerCase()) ||
        t.email?.toLowerCase().includes(search.toLowerCase()) ||
        t.department?.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '20px' }}>
            <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--bg-primary)', borderTopColor: 'var(--primary-blue)', borderRadius: '50%' }}></div>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Synchronizing Faculty Records...</p>
        </div>
    );

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Faculty Directory</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Managing {teachers.length} registered academic personnel across departments.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => navigate('/admin/teachers/add')} className="btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiUser /> Onboard New Faculty
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input
                            type="text"
                            placeholder="Search by name, email or department..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ 
                                width: '100%', padding: '12px 12px 12px 44px', 
                                background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', 
                                borderRadius: '12px', fontSize: '14px', color: 'var(--text-primary)', outline: 'none' 
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ padding: '10px 16px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700' }}>
                            <FiFilter /> Filter
                        </button>
                        <button style={{ padding: '10px 16px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700' }}>
                            <FiDownload /> Export CSV
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                {['Faculty Identity', 'Institutional Email', 'Department', 'Contact', 'Status', 'Actions'].map(h => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '60px', textAlign: 'center' }}>
                                        <FiUser size={48} style={{ opacity: 0.1, marginBottom: '16px' }} />
                                        <div style={{ color: 'var(--text-light)', fontWeight: '600' }}>No faculty records match your criteria.</div>
                                    </td>
                                </tr>
                            ) : filtered.map(t => (
                                <tr key={t._id}>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-primary)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px' }}>
                                                {t.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '15px' }}>{t.name}</div>
                                                <div style={{ color: 'var(--text-light)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>{t.qualification || 'FACULTY'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{t.email}</span></td>
                                    <td>
                                        <span style={{ background: 'rgba(37, 99, 235, 0.05)', color: 'var(--primary-blue)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                                            {t.department?.name || t.department || 'GENERAL'}
                                        </span>
                                    </td>
                                    <td><span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{t.phone || '—'}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '12px', fontWeight: '700' }}>
                                            <FiCheckCircle size={14} /> ACTIVE
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => navigate(`/admin/teachers/profile/${t._id}`)} title="View Analytics" style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '8px', color: 'var(--primary-blue)', cursor: 'pointer' }}><FiUser size={16} /></button>
                                            <button title="Modify Account" style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '8px', color: '#d97706', cursor: 'pointer' }}><FiEdit2 size={16} /></button>
                                            <button onClick={() => handleDelete(t._id)} title="Remove Access" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', color: 'var(--accent-red)', cursor: 'pointer' }}><FiTrash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                table { width: 100%; border-collapse: collapse; }
                th { background: var(--bg-primary); padding: 18px 24px; text-align: left; color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; border-bottom: 1px solid var(--glass-border); }
                td { padding: 16px 24px; border-bottom: 1px solid var(--glass-border); color: var(--text-secondary); font-size: 14px; vertical-align: middle; }
                tr:hover { background: rgba(37, 99, 235, 0.02); }
            `}</style>
        </div>
    );
};

export default ViewTeachers;
