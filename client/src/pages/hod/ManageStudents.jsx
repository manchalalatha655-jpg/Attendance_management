import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiSearch, FiFilter, FiMoreVertical, FiUser, FiMail, FiHash, FiCalendar, FiPieChart, FiUserPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import AddUserModal from '../../components/AddUserModal';

const ManageStudents = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const deptStudents = res.data.filter(u => u.role === 'student' && u.department === user.department);
            setStudents(deptStudents);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [user]);

    const handleEdit = (s) => {
        setEditingUser(s);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this student?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Student removed successfully');
            fetchStudents();
        } catch (err) {
            alert('Error removing student: ' + (err.response?.data?.message || err.message));
        }
    };

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (s.studentId && s.studentId.includes(searchTerm));
        const matchesYear = filterYear === 'All' || s.year === filterYear;
        return matchesSearch && matchesYear;
    });

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Student Directory</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Managing student records for <span style={{ color: 'var(--primary-blue)', fontWeight: '700' }}>{user.department}</span></p>
                </div>
                <button onClick={handleAdd} className="btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)' }}>
                    <FiUserPlus size={18} /> Onboard Student
                </button>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ position: 'relative', width: '350px' }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or Roll No..." 
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
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FiFilter style={{ color: 'var(--primary-blue)' }} />
                        <select 
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            style={{ 
                                padding: '10px 16px', 
                                background: 'var(--bg-primary)', 
                                border: '1px solid var(--glass-border)', 
                                borderRadius: '10px', 
                                fontSize: '14px', 
                                outline: 'none', 
                                color: 'var(--text-primary)',
                                fontWeight: '600'
                            }}
                        >
                            <option value="All">All Academic Years</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                        <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--bg-primary)', borderTopColor: 'var(--primary-blue)', borderRadius: '50%', margin: '0 auto 20px' }}></div>
                        Processing Student Database...
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Identity</th>
                                    <th>Roll Number</th>
                                    <th>Academic Status</th>
                                    <th>Current Attendance</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? filteredStudents.map((s, i) => {
                                    const mockAtt = Math.floor(Math.random() * (98 - 60 + 1)) + 60;
                                    const attColor = mockAtt >= 75 ? 'var(--accent-green)' : mockAtt >= 65 ? '#d97706' : 'var(--accent-red)';
                                    const attBg = mockAtt >= 75 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(217, 119, 6, 0.1)';

                                    return (
                                        <tr key={s._id || i}>
                                            <td style={{ padding: '20px 24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                    <div style={{ width: '42px', height: '42px', background: 'var(--blue-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>
                                                        {s.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '15px' }}>{s.name}</div>
                                                        <div style={{ color: 'var(--text-light)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <FiMail size={12} /> {s.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                                    <FiHash size={14} style={{ color: 'var(--primary-blue)' }} />
                                                    {s.studentId || 'STUD-'+(i+1)}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                                                    <FiCalendar size={14} style={{ color: 'var(--primary-blue)' }} />
                                                    {s.year || 'N/A'}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ flex: 1, height: '6px', background: 'var(--bg-primary)', borderRadius: '10px', maxWidth: '100px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${mockAtt}%`, height: '100%', background: attColor }} />
                                                    </div>
                                                    <span style={{ 
                                                        background: attBg, 
                                                        color: attColor, 
                                                        padding: '4px 12px', 
                                                        borderRadius: '20px', 
                                                        fontSize: '12px', 
                                                        fontWeight: '800',
                                                        border: `1px solid ${attColor}20`
                                                    }}>
                                                        {mockAtt}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                    <button onClick={() => handleEdit(s)} style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '8px', color: 'var(--primary-blue)', cursor: 'pointer' }} title="Edit Profile"><FiEdit2 size={16} /></button>
                                                    <button onClick={() => handleDelete(s._id)} style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', color: 'var(--accent-red)', cursor: 'pointer' }} title="Remove Student"><FiTrash2 size={16} /></button>
                                                    <button style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '8px', color: 'var(--text-light)', cursor: 'pointer' }}><FiMoreVertical size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '60px' }}>
                                            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>🎓</div>
                                            <div style={{ color: 'var(--text-light)', fontWeight: '600' }}>No student records matching your search criteria.</div>
                                            <p style={{ color: 'var(--text-light)', fontSize: '13px', marginTop: '4px' }}>Try adjusting your search terms or year filter.</p>
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
                onUserAdded={fetchStudents} 
                token={user.token}
                editUser={editingUser}
            />
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

export default ManageStudents;
