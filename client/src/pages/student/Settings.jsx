import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();
    
    const [profile, setProfile] = useState({
        name: user?.name || 'John Doe',
        studentId: user?.rollNo || '123055',
        email: user?.email || 'john.doe@email.com'
    });

    const [password, setPassword] = useState({
        current: '',
        new: ''
    });

    const [notifications, setNotifications] = useState({
        alerts: true
    });

    return (
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '14px', color: '#194582', background: '#f8f9fa', padding: '10px 15px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                    Profile Information
                </h3>
                <div style={{ padding: '0 15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                        <label style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>Name:</label>
                        <input 
                            type="text" 
                            value={profile.name}
                            onChange={e => setProfile({...profile, name: e.target.value})}
                            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                        <label style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>Student ID:</label>
                        <input 
                            type="text" 
                            value={profile.studentId}
                            onChange={e => setProfile({...profile, studentId: e.target.value})}
                            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center' }}>
                        <label style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>Email:</label>
                        <input 
                            type="email" 
                            value={profile.email}
                            onChange={e => setProfile({...profile, email: e.target.value})}
                            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '14px', color: '#194582', background: '#f8f9fa', padding: '10px 15px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                    Change Password
                </h3>
                <div style={{ padding: '0 15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                        <label style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>Current Password:</label>
                        <input 
                            type="password" 
                            value={password.current}
                            onChange={e => setPassword({...password, current: e.target.value})}
                            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '300px' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center' }}>
                        <label style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>New Password:</label>
                        <input 
                            type="password" 
                            value={password.new}
                            onChange={e => setPassword({...password, new: e.target.value})}
                            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '300px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '14px', color: '#194582', background: '#f8f9fa', padding: '10px 15px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                    Email Notifications
                </h3>
                <div style={{ padding: '0 15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input 
                            type="checkbox" 
                            checked={notifications.alerts}
                            onChange={e => setNotifications({...notifications, alerts: e.target.checked})}
                            style={{ width: '16px', height: '16px', accentColor: '#27ae60' }}
                        />
                        <label style={{ fontSize: '14px', color: '#555' }}>Receive Attendance Alerts</label>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button style={{
                    padding: '10px 30px',
                    background: '#194582',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
