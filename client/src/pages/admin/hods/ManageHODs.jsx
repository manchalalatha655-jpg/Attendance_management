import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    FiUsers, FiUserPlus, FiEdit2, FiTrash2, FiSearch, 
    FiFilter, FiMail, FiPhone, FiMapPin, FiActivity 
} from 'react-icons/fi';

const ManageHODs = () => {
    const [hods, setHods] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingHOD, setEditingHOD] = useState(null);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        phone: '',
        hodId: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [hodResponse, deptResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/users?role=hod'),
                axios.get('http://localhost:5000/api/admin/departments')
            ]);
            setHods(hodResponse.data);
            setDepartments(deptResponse.data);
        } catch (error) {
            console.error('Error fetching HODs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingHOD) {
                await axios.put(`http://localhost:5000/api/admin/users/${editingHOD._id}`, formData);
                alert('HOD Updated successfully');
            } else {
                const submitData = {
                    ...formData,
                    role: 'hod'
                };
                await axios.post('http://localhost:5000/api/auth/register', submitData);
                alert('HOD Added successfully');
            }
            setShowModal(false);
            setEditingHOD(null);
            setFormData({ name: '', email: '', password: '', department: '', phone: '', hodId: '' });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this HOD?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
                fetchData();
            } catch (error) {
                alert('Failed to delete HOD');
            }
        }
    };

    const filteredHods = hods.filter(hod => 
        hod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hod.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hod.department?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>Departmental Leadership</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Manage Head of Departments (HOD) across the institution</p>
                </div>
                <button 
                    onClick={() => { setEditingHOD(null); setShowModal(true); }}
                    className="btn-primary"
                    style={{ 
                        padding: '12px 24px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        boxShadow: '0 8px 16px rgba(37, 99, 235, 0.25)'
                    }}
                >
                    <FiUserPlus size={18} /> Register New HOD
                </button>
            </div>

            {/* Filters Bar */}
            <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '16px', 
                marginBottom: '32px',
                display: 'flex',
                gap: '16px',
                boxShadow: 'var(--shadow)',
                border: '1px solid var(--glass-border)'
            }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input 
                        type="text" 
                        placeholder="Filter by name, email or department..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '12px 12px 12px 44px', 
                            background: 'var(--bg-primary)', 
                            border: '1px solid var(--glass-border)', 
                            borderRadius: '12px',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <button style={{ padding: '0 20px', background: 'white', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600' }}>
                    <FiFilter /> Advanced Filter
                </button>
            </div>

            {/* HOD Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-secondary)' }}>
                    <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--bg-primary)', borderTopColor: 'var(--primary-blue)', borderRadius: '50%', margin: '0 auto 20px' }}></div>
                    Synchronizing Leadership Data...
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
                    {filteredHods.map((hod) => (
                        <div key={hod._id} className="card" style={{ 
                            padding: '24px',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                        }}>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                                <div style={{ 
                                    width: '64px', 
                                    height: '64px', 
                                    background: 'var(--blue-gradient)', 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontSize: '24px', 
                                    color: 'white',
                                    fontWeight: '800',
                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                                }}>
                                    {hod.name.charAt(0)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: 'var(--text-primary)', fontWeight: '800' }}>{hod.name}</h3>
                                    <span style={{ 
                                        background: 'rgba(37, 99, 235, 0.1)', 
                                        color: 'var(--primary-blue)', 
                                        fontSize: '11px', 
                                        padding: '4px 10px', 
                                        borderRadius: '6px',
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {hod.department?.name || hod.department || 'NO DEPT'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => { setEditingHOD(hod); setFormData({...hod, department: hod.department?._id || hod.department}); setShowModal(true); }} style={{ background: 'var(--bg-primary)', border: 'none', color: 'var(--primary-blue)', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><FiEdit2 size={16} /></button>
                                    <button onClick={() => handleDelete(hod._id)} style={{ background: 'rgba(239, 68, 68, 0.05)', border: 'none', color: 'var(--accent-red)', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><FiTrash2 size={16} /></button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '12px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <FiMail size={14} style={{ color: 'var(--primary-blue)' }} /> {hod.email}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <FiPhone size={14} style={{ color: 'var(--primary-blue)' }} /> {hod.phone || 'Contact not provided'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <FiActivity size={14} style={{ color: 'var(--primary-blue)' }} /> Employee ID: <span style={{fontWeight: '700'}}>{hod.hodId || 'PENDING'}</span>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600' }}>REGISTRATION DATE: {new Date(hod.createdAt).toLocaleDateString()}</div>
                                <button style={{ background: 'white', border: '1px solid var(--glass-border)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: '700' }}>Full Profile</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
                    <div className="card" style={{ width: '100%', maxWidth: '540px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                        <h2 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)', fontSize: '24px', fontWeight: '800' }}>{editingHOD ? 'Edit Leadership Profile' : 'New HOD Onboarding'}</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>Enter the details to register a new department head.</p>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>Full Name</label>
                                    <input name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required style={modalInputStyle} />
                                </div>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>Employee ID</label>
                                    <input name="hodId" placeholder="HOD-123" value={formData.hodId} onChange={handleInputChange} required style={modalInputStyle} />
                                </div>
                            </div>
                            
                            <div style={modalGroupStyle}>
                                <label style={modalLabelStyle}>Email Address</label>
                                <input name="email" type="email" placeholder="email@institution.edu" value={formData.email} onChange={handleInputChange} required style={modalInputStyle} />
                            </div>

                            {!editingHOD && (
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>System Password</label>
                                    <input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} required style={modalInputStyle} />
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>Department</label>
                                    <select name="department" value={formData.department} onChange={handleInputChange} required style={modalInputStyle}>
                                        <option value="">Select Dept</option>
                                        {departments.map(dept => (
                                            <option key={dept._id} value={dept.name}>{dept.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>Contact Number</label>
                                    <input name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleInputChange} style={modalInputStyle} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, padding: '14px' }}>Discard</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '14px' }}>{editingHOD ? 'Save Changes' : 'Confirm Registration'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

const modalGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const modalLabelStyle = { fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' };
const modalInputStyle = {
    padding: '12px 16px',
    borderRadius: '10px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.3s ease'
};

export default ManageHODs;
