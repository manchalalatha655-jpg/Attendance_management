import React from 'react';
import { FiUser, FiMail, FiShield, FiKey, FiCamera } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

const AdminProfile = () => {
    const { user } = useAuth();

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>Profile Settings</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Manage your personal account information and security.</p>

            <div style={{ maxWidth: '800px', background: 'var(--bg-secondary)', borderRadius: '24px', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
                <div style={{ height: '140px', background: 'var(--blue-gradient)', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '-50px', left: '40px', width: '120px', height: '120px', borderRadius: '30px', background: 'var(--bg-secondary)', border: '6px solid var(--bg-secondary)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                        <div style={{ width: '100%', height: '100%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)', fontSize: '40px', fontWeight: '800' }}>
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '70px 40px 40px 40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FiUser style={{ color: 'var(--primary-blue)' }} /> Basic Information
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)' }}>Full Name</label>
                                    <input type="text" defaultValue={user?.name || 'Administrator'} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)' }}>Email Address</label>
                                    <input type="email" defaultValue={user?.email || 'admin@vemu.org'} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }} disabled />
                                </div>
                                <button style={{ width: 'fit-content', padding: '10px 24px', background: 'var(--blue-gradient)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                                    Save Profile
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FiKey style={{ color: 'var(--primary-blue)' }} /> Security
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)' }}>Current Password</label>
                                    <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)' }}>New Password</label>
                                    <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }} />
                                </div>
                                <button style={{ width: 'fit-content', padding: '10px 24px', background: 'var(--bg-primary)', color: 'var(--primary-blue)', border: '1px solid var(--primary-blue)', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default AdminProfile;
