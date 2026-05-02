import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiX, FiUserPlus, FiMail, FiShield, FiTag, FiEdit, FiInfo, FiLock, FiBriefcase } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AddUserModal = ({ isOpen, onClose, onUserAdded, token, editUser = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        department: '',
        studentId: '',
    });
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (editUser) {
                setFormData({
                    name: editUser.name || '',
                    email: editUser.email || '',
                    password: '', // Don't show password
                    role: editUser.role || 'student',
                    department: editUser.department?._id || editUser.department || '',
                    studentId: editUser.studentId || '',
                });
            } else {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'student',
                    department: '',
                    studentId: '',
                });
            }
            fetchDepts();
        }
    }, [isOpen, editUser]);

    const fetchDepts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/users?role=admin', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Assume we have a real /departments endpoint or use some mock data
            setDepartments([{ _id: 'demo-dept-id', name: 'Computer Science' }, { _id: 'ece-id', name: 'Electronics' }]);
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editUser) {
                // Remove password from payload if it's empty during edit
                const payload = { ...formData };
                if (!payload.password) delete payload.password;
                
                await axios.put(`http://localhost:5000/api/admin/users/${editUser._id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('User updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/auth/register', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('User created successfully');
            }
            onUserAdded();
            onClose();
        } catch (err) {
            alert('Error processing request: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000
                }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="card" 
                        style={{
                            width: '100%', maxWidth: '540px', padding: '40px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative', border: '1px solid var(--glass-border)'
                        }}
                    >
                        <button onClick={onClose} style={{ position: 'absolute', right: '24px', top: '24px', fontSize: '20px', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
                            <FiX />
                        </button>

                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 8px 0', color: 'var(--text-primary)', fontSize: '24px', fontWeight: '800' }}>
                                {editUser ? <FiEdit color="var(--primary-blue)" /> : <FiUserPlus color="var(--primary-blue)" />} 
                                {editUser ? 'Modify User Profile' : 'System User Onboarding'}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                {editUser ? 'Update the identity and access levels for this account.' : 'Provide the essential details to create a new institutional account.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Institutional Identity (Full Name)</label>
                                <div style={inputWrapperStyle}>
                                    <FiInfo style={iconStyle} />
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Dr. Robert Smith" style={inputStyle} />
                                </div>
                            </div>

                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Primary Contact Email</label>
                                <div style={inputWrapperStyle}>
                                    <FiMail style={iconStyle} />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="identity@institution.edu" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>Access Authorization</label>
                                    <div style={inputWrapperStyle}>
                                        <FiShield style={iconStyle} />
                                        <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
                                            <option value="student">Student Account</option>
                                            <option value="teacher">Faculty Account</option>
                                            <option value="hod">Department Head</option>
                                            <option value="librarian">Librarian Account</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>Departmental Unit</label>
                                    <div style={inputWrapperStyle}>
                                        <FiBriefcase style={iconStyle} />
                                        <select name="department" value={formData.department} onChange={handleChange} style={inputStyle}>
                                            <option value="">Select Dept</option>
                                            {departments.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>{editUser ? 'Change Access Credentials' : 'Access Credentials (Password)'}</label>
                                <div style={inputWrapperStyle}>
                                    <FiLock style={iconStyle} />
                                    <input type="password" name="password" onChange={handleChange} required={!editUser} placeholder={editUser ? 'Leave blank to retain current' : 'Set initial password'} style={inputStyle} />
                                </div>
                            </div>

                            {formData.role === 'student' && (
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>Academic Roll Number</label>
                                    <div style={inputWrapperStyle}>
                                        <FiTag style={iconStyle} />
                                        <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required placeholder="ROLL-2024-XXX" style={inputStyle} />
                                    </div>
                                </div>
                            )}
                            
                            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                                <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, padding: '14px' }}>Cancel</button>
                                <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, padding: '14px', position: 'relative' }}>
                                    {loading ? 'Processing...' : (editUser ? 'Save Identity' : 'Confirm Registration')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' };
const inputWrapperStyle = { position: 'relative' };
const iconStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-blue)', opacity: 0.8 };
const inputStyle = {
    width: '100%', padding: '12px 12px 12px 48px', borderRadius: '12px',
    background: 'var(--bg-primary)', border: '1px solid var(--glass-border)',
    color: 'var(--text-primary)', outline: 'none', fontSize: '14px', transition: 'all 0.3s'
};

export default AddUserModal;
