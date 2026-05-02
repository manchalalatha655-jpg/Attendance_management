import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiUserPlus, FiEdit2, FiTrash2, FiSearch, FiBriefcase, FiMail, FiHash, FiMoreHorizontal } from 'react-icons/fi';
import AddUserModal from '../../components/AddUserModal';

const ManageFaculty = () => {
    const { user } = useAuth();
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const fetchFaculty = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const deptFaculty = res.data.filter(u => u.role === 'teacher' && u.department === user.department);
            setFaculty(deptFaculty);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaculty();
    }, [user]);

    const handleEdit = (f) => {
        setEditingUser(f);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this faculty member?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Faculty removed successfully');
            fetchFaculty();
        } catch (err) {
            alert('Error removing faculty: ' + (err.response?.data?.message || err.message));
        }
    };

    const filteredFaculty = faculty.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        f.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Faculty Management</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Managing teaching staff for <span style={{ color: 'var(--primary-blue)', fontWeight: '700' }}>{user.department}</span></p>
                </div>
                <button onClick={handleAdd} className="btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)' }}>
                    <FiUserPlus size={18} /> Onboard Faculty
                </button>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or employee ID..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '12px 12px 12px 44px', 
                                background: 'var(--bg-primary)', 
                                border: '1px solid var(--glass-border)', 
                                borderRadius: '12px', 
                                fontSize: '14px', 
                                outline: 'none', 
                                color: 'var(--text-primary)',
                                transition: 'all 0.3s'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                            {filteredFaculty.length} Faculty Members Found
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                        <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--bg-primary)', borderTopColor: 'var(--primary-blue)', borderRadius: '50%', margin: '0 auto 20px' }}></div>
                        Retrieving Staff Directory...
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Faculty Details</th>
                                    <th>Employee ID</th>
                                    <th>Specialization</th>
                                    <th>Academic Load</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFaculty.length > 0 ? filteredFaculty.map((f, i) => (
                                    <tr key={f._id || i}>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{ width: '42px', height: '42px', background: 'var(--blue-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '16px' }}>
                                                    {f.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '15px' }}>{f.name}</div>
                                                    <div style={{ color: 'var(--text-light)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <FiMail size={12} /> {f.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                                <FiHash size={14} style={{ color: 'var(--primary-blue)' }} />
                                                {f.employeeId || 'FAC-00'+(i+1)}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                                                <FiBriefcase size={14} style={{ color: 'var(--primary-blue)' }} />
                                                {f.subject || 'Core Faculty'}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ 
                                                background: 'rgba(37, 99, 235, 0.1)', 
                                                color: 'var(--primary-blue)', 
                                                padding: '6px 14px', 
                                                borderRadius: '20px', 
                                                fontSize: '12px', 
                                                fontWeight: '700', 
                                                border: '1px solid rgba(37, 99, 235, 0.2)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                {f.assignedClass?.length || 0} Assigned Classes
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                <button onClick={() => handleEdit(f)} style={{ background: 'var(--bg-primary)', color: 'var(--primary-blue)', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} title="Edit Details"><FiEdit2 size={16} /></button>
                                                <button onClick={() => handleDelete(f._id)} style={{ background: 'rgba(239, 68, 68, 0.05)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} title="Remove Faculty"><FiTrash2 size={16} /></button>
                                                <button style={{ background: 'var(--bg-primary)', color: 'var(--text-light)', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><FiMoreHorizontal size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '60px' }}>
                                            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>👥</div>
                                            <div style={{ color: 'var(--text-light)', fontWeight: '600' }}>No faculty records found in {user.department}.</div>
                                            <p style={{ color: 'var(--text-light)', fontSize: '13px', marginTop: '4px' }}>Onboard new teaching staff to start managing their records.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <AddUserModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onUserAdded={fetchFaculty} 
                token={user.token}
                editUser={editingUser}
            />

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                table { width: 100%; border-collapse: collapse; }
                th { background: var(--bg-primary); padding: 18px 24px; text-align: left; color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; border-bottom: 1px solid var(--glass-border); }
                td { padding: 16px 24px; border-bottom: 1px solid var(--glass-border); color: var(--text-secondary); font-size: 14px; vertical-align: middle; }
                tr:hover { background: rgba(37, 99, 235, 0.02); }
                .btn-primary:hover { transform: translateY(-2px); boxShadow: 0 12px 20px rgba(37, 99, 235, 0.3); }
            `}</style>
        </div>
    );
};

export default ManageFaculty;
