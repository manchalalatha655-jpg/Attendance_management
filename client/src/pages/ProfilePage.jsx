import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiShield, FiSave } from 'react-icons/fi';

const ProfilePage = () => {
    const { user } = useAuth();
    const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [strength, setStrength] = useState({ score: 0, color: '#ff7675', label: 'Weak' });

    const calculateStrength = (pass) => {
        let score = 0;
        if (pass.length > 5) score++;
        if (pass.length > 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score < 3) return { score, color: '#ff7675', label: 'Weak' };
        if (score < 5) return { score, color: '#f1c40f', label: 'Good' };
        return { score, color: '#2ecc71', label: 'Strong' };
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            return setMessage('Passwords do not match');
        }
        setLoading(true);
        try {
            await axios.put('http://localhost:5000/api/auth/change-password', passwords, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Password updated successfully!');
            setMessage('Password updated successfully!');
            setPasswords({ old: '', new: '', confirm: '' });
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error updating password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '30px' }}>User <span className="gradient-text">Profile</span></h1>

            <div className="glass-card animate-fade-in" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '30px',
                        background: 'var(--primary-gradient)',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '50px',
                        color: 'white',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <FiUser />
                    </div>
                    <h3 style={{ textTransform: 'capitalize' }}>{user.role}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Member since 2024</p>
                </div>

                <div>
                    <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <FiUser style={{ color: 'var(--primary-blue)' }} />
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>Full Name</p>
                                <p style={{ fontWeight: '600' }}>{user.name}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <FiMail style={{ color: 'var(--primary-blue)' }} />
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>Email Address</p>
                                <p style={{ fontWeight: '600' }}>{user.email}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <FiShield style={{ color: 'var(--primary-blue)' }} />
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>Role</p>
                                <p style={{ fontWeight: '600', textTransform: 'capitalize' }}>{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordChange}>
                        <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiLock /> Security Settings
                        </h4>
                        
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={passwords.old}
                                onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                                required
                            />
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={passwords.new}
                                    onChange={(e) => {
                                        setPasswords({...passwords, new: e.target.value});
                                        setStrength(calculateStrength(e.target.value));
                                    }}
                                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', width: '100%' }}
                                    required
                                />
                                {passwords.new && (
                                    <div style={{ marginTop: '8px' }}>
                                        <div style={{ display: 'flex', gap: '4px', height: '4px', marginBottom: '4px' }}>
                                            {[1, 2, 3].map(i => (
                                                <div key={i} style={{ 
                                                    flex: 1, 
                                                    background: i <= (strength.score / 2 + 1) ? strength.color : '#eee',
                                                    borderRadius: '2px',
                                                    transition: 'all 0.3s ease'
                                                }} />
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '11px', color: strength.color }}>{strength.label}</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                                required
                            />
                            
                            <button 
                                type="submit" 
                                disabled={loading}
                                style={{
                                    padding: '12px',
                                    background: 'var(--primary-gradient)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}
                            >
                                <FiSave /> {loading ? 'Saving...' : 'Update Password'}
                            </button>
                            {message && (
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    color: message.includes('success') ? 'var(--secondary-teal)' : 'var(--accent-red)'
                                }}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
