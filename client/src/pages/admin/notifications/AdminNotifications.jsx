import React, { useState } from 'react';
import { FiBell, FiSend, FiUsers, FiClock, FiCheck } from 'react-icons/fi';

const AdminNotifications = () => {
    const [msg, setMsg] = useState('');
    const [target, setTarget] = useState('All');

    const sentNotifications = [
        { id: 1, text: 'Holiday announced for May 1st on account of May Day.', target: 'All Users', date: '2026-04-29', read: 450 },
        { id: 2, text: 'System maintenance scheduled for tonight at 11 PM.', target: 'All Users', date: '2026-04-28', read: 612 },
        { id: 3, text: 'Please complete the internal audit reports by Friday.', target: 'HODs', date: '2026-04-25', read: 12 },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>Notifications Center</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Broadcast messages and announcements to specific user roles.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Broadcast Form */}
                <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiSend style={{ color: 'var(--primary-blue)' }} /> Create Broadcast
                    </h3>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Select Audience</label>
                        <select 
                            value={target} 
                            onChange={e => setTarget(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }}
                        >
                            <option value="All">All Users</option>
                            <option value="HODs">All HODs</option>
                            <option value="Teachers">All Teachers</option>
                            <option value="Students">All Students</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Message Body</label>
                        <textarea 
                            value={msg} 
                            onChange={e => setMsg(e.target.value)}
                            placeholder="Type your announcement here..."
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', minHeight: '120px' }}
                        />
                    </div>
                    <button style={{ width: '100%', padding: '12px', background: 'var(--blue-gradient)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FiBell /> Send Notification
                    </button>
                </div>

                {/* Sent History */}
                <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiClock style={{ color: 'var(--primary-blue)' }} /> Recently Sent
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {sentNotifications.map(n => (
                            <div key={n.id} style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)' }}>
                                <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: '0 0 10px 0', lineHeight: '1.4' }}>{n.text}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '11px', color: 'var(--primary-blue)', fontWeight: '700', textTransform: 'uppercase' }}>{n.target}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-light)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCheck /> {n.read} read</span>
                                        <span>{n.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default AdminNotifications;
