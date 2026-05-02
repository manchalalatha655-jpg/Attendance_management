import React from 'react';
import { FiAlertTriangle, FiMail, FiUser, FiBell, FiArrowRight } from 'react-icons/fi';

const ShortageAlerts = () => {
    const alerts = [
        { id: 1, name: 'Charlie Brown', studentId: '2023CS03', attendance: '68%', class: 'CS-102 (B)', subject: 'Java Programming', trend: 'down' },
        { id: 2, name: 'Ethan Hunt', studentId: '2023CS05', attendance: '74%', class: 'CS-102 (B)', subject: 'Java Programming', trend: 'stable' },
        { id: 3, name: 'Latha S.', studentId: '2023CS18', attendance: '62%', class: 'CS-101 (A)', subject: 'Data Structures', trend: 'down' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Attendance Shortage Alerts</h2>
                <p style={{ color: 'var(--text-light)' }}>Students falling below the mandatory 75% attendance threshold.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
                {alerts.map((alert) => (
                    <div key={alert.id} style={{ 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '24px', 
                        padding: '24px', 
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        boxShadow: 'var(--shadow)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: 'var(--accent-red)' }} />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-red)' }}>
                                    <FiAlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)' }}>{alert.name}</h3>
                                    <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: '600' }}>ID: {alert.studentId}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--accent-red)' }}>{alert.attendance}</div>
                                <div style={{ fontSize: '10px', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '700' }}>Current Attendance</div>
                            </div>
                        </div>

                        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '16px', marginBottom: '24px' }}>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Class:</span> <strong>{alert.class}</strong>
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Subject:</span> <strong>{alert.subject}</strong>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn-primary" style={{ flex: 1, padding: '12px', fontSize: '14px', borderRadius: '12px', background: 'var(--primary-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <FiMail /> Email Parent
                            </button>
                            <button style={{ 
                                padding: '12px 20px', 
                                borderRadius: '12px', 
                                background: 'transparent', 
                                border: '1px solid var(--glass-border)',
                                color: 'var(--primary-accent)',
                                cursor: 'pointer'
                            }}>
                                <FiBell size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShortageAlerts;
