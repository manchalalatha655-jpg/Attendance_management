import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();
    
    const [profile, setProfile] = useState({
        name: user?.name || 'Dr. Steven Clark',
        email: user?.email || 'steven.clark@email.com'
    });

    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const [notifications, setNotifications] = useState({
        alerts: true,
        summary: true
    });

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '16px', color: '#194582', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    Update Profile
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>Name:</label>
                    <input 
                        type="text" 
                        value={profile.name}
                        onChange={e => setProfile({...profile, name: e.target.value})}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px' }}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>Email:</label>
                    <input 
                        type="email" 
                        value={profile.email}
                        onChange={e => setProfile({...profile, email: e.target.value})}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '400px' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '16px', color: '#194582', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    Change Password
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>Current Password:</label>
                    <input 
                        type="password" 
                        value={password.current}
                        onChange={e => setPassword({...password, current: e.target.value})}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '300px' }}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>New Password:</label>
                    <input 
                        type="password" 
                        value={password.new}
                        onChange={e => setPassword({...password, new: e.target.value})}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '300px' }}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '15px', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>Confirm Password:</label>
                    <input 
                        type="password" 
                        value={password.confirm}
                        onChange={e => setPassword({...password, confirm: e.target.value})}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', maxWidth: '300px' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '16px', color: '#194582', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    Email Notifications
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <input 
                        type="checkbox" 
                        checked={notifications.alerts}
                        onChange={e => setNotifications({...notifications, alerts: e.target.checked})}
                        style={{ width: '16px', height: '16px', accentColor: '#27ae60' }}
                    />
                    <label style={{ fontSize: '14px', color: '#555' }}>Receive Attendance Alerts</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                        type="checkbox" 
                        checked={notifications.summary}
                        onChange={e => setNotifications({...notifications, summary: e.target.checked})}
                        style={{ width: '16px', height: '16px', accentColor: '#27ae60' }}
                    />
                    <label style={{ fontSize: '14px', color: '#555' }}>Weekly Summary Emails</label>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button onClick={handleSave} style={{
                    padding: '12px 30px',
                    background: '#194582',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
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
