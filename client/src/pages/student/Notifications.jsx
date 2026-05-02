import React from 'react';
import { FiBell, FiInfo, FiAlertCircle, FiCheckCircle, FiClock, FiTrash2 } from 'react-icons/fi';

const Notifications = () => {
    const notifications = [
        { id: 1, title: 'Attendance Shortage Alert', msg: 'Your attendance in Java Programming has fallen to 74%. Please contact your HOD.', time: '2 hours ago', type: 'alert', read: false },
        { id: 2, title: 'Study Material Uploaded', msg: 'Prof. Navyasree uploaded new notes for Data Structures: "Unit 3 - Trees".', time: '5 hours ago', type: 'info', read: false },
        { id: 3, title: 'Leave Application Approved', msg: 'Your leave application for 2024-05-15 has been approved by the HOD.', time: '1 day ago', type: 'success', read: true },
        { id: 4, title: 'Timetable Updated', msg: 'The room for CS-101 (A) has been changed from R302 to R405 for Wednesday.', time: '2 days ago', type: 'info', read: true },
    ];

    const getIcon = (type) => {
        switch(type) {
            case 'alert': return <FiAlertCircle size={20} color="var(--accent-red)" />;
            case 'success': return <FiCheckCircle size={20} color="var(--accent-green)" />;
            default: return <FiInfo size={20} color="var(--primary-blue)" />;
        }
    };

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Notifications</h2>
                    <p style={{ color: 'var(--text-light)' }}>Stay updated with academic alerts, material uploads, and portal updates.</p>
                </div>
                <button style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '700', cursor: 'pointer' }}>Mark All as Read</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {notifications.map((n) => (
                    <div key={n.id} style={{ 
                        background: n.read ? 'var(--bg-secondary)' : 'rgba(14, 47, 118, 0.03)', 
                        borderRadius: '20px', 
                        padding: '24px', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: n.read ? 'none' : 'var(--shadow)',
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'flex-start',
                        transition: 'all 0.3s',
                        position: 'relative'
                    }}>
                        {!n.read && <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', width: '4px', height: '40px', background: 'var(--primary-accent)', borderRadius: '0 4px 4px 0' }} />}
                        
                        <div style={{ width: '45px', height: '45px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow)' }}>
                            {getIcon(n.type)}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary-accent)' }}>{n.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-light)', fontWeight: '700' }}>
                                    <FiClock /> {n.time}
                                </div>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>{n.msg}</p>
                        </div>

                        <button style={{ background: 'transparent', border: 'none', color: 'rgba(239, 68, 68, 0.4)', cursor: 'pointer', padding: '8px' }}>
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
