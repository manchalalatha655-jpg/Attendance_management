import React from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiSettings, FiBell, FiShield, FiSave } from 'react-icons/fi';

const HODSettings = () => {
    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Profile Settings</h2>
                <p style={{ color: 'var(--text-light)' }}>Manage your personal information and departmental preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Profile Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '40px 24px', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
                        <div style={{ width: '100px', height: '100px', background: 'var(--blue-gradient)', borderRadius: '30px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px', fontWeight: '800', boxShadow: '0 10px 20px rgba(14, 47, 118, 0.2)' }}>
                            H
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '4px' }}>Head of Department</h3>
                        <p style={{ color: 'var(--primary-blue)', fontSize: '14px', fontWeight: '700', marginBottom: '24px' }}>Computer Science Engineering</p>
                        
                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <FiMail /> <span>hod.cse@vemu.org</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <FiPhone /> <span>+91 98765 43210</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiSettings /> Personal Information
                        </h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>Full Name</label>
                            <input type="text" defaultValue="Head of Department" style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', fontWeight: '600' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>Email Address</label>
                            <input type="email" defaultValue="hod.cse@vemu.org" style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', fontWeight: '600' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>Department</label>
                            <input type="text" defaultValue="Computer Science Engineering" disabled style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.4)', border: '1px solid var(--glass-border)', fontWeight: '600', cursor: 'not-allowed' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>Designation</label>
                            <input type="text" defaultValue="Senior Professor" style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', fontWeight: '600' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', borderTop: '1px solid var(--glass-border)', paddingTop: '32px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                            <FiShield /> Security
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>Current Password</label>
                                <input type="password" placeholder="••••••••" style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>New Password</label>
                                <input type="password" placeholder="Leave blank to keep same" style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 32px', borderRadius: '12px' }}>
                            <FiSave /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HODSettings;
