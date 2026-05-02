import React, { useState } from 'react';
import { FiPlus, FiClock, FiCheckCircle, FiXCircle, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const LeaveManagement = () => {
    const [showModal, setShowModal] = useState(false);
    
    const leaveHistory = [
        { id: 1, type: 'Casual Leave', startDate: '2024-05-10', endDate: '2024-05-11', days: 2, status: 'Approved', reason: 'Family event' },
        { id: 2, type: 'Medical Leave', startDate: '2024-04-15', endDate: '2024-04-16', days: 2, status: 'Approved', reason: 'Doctor appointment' },
        { id: 3, type: 'Sick Leave', startDate: '2024-05-25', endDate: '2024-05-25', days: 1, status: 'Pending', reason: 'Fever' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Leave Management</h2>
                    <p style={{ color: 'var(--text-light)' }}>Apply for leaves and track your application status.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px' }}>
                    <FiPlus /> Apply for Leave
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                {[
                    { label: 'Total Leaves', value: 12, color: 'var(--primary-blue)' },
                    { label: 'Used Leaves', value: 5, color: 'var(--accent-green)' },
                    { label: 'Remaining', value: 7, color: 'var(--primary-accent)' }
                ].map((stat, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '20px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>{stat.label}</div>
                        <div style={{ fontSize: '32px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(14, 47, 118, 0.02)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)' }}>Application History</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'var(--primary-accent)' }}>
                        <tr>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '13px' }}>LEAVE TYPE</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '13px' }}>DURATION</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '13px' }}>DAYS</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '13px' }}>REASON</th>
                            <th style={{ padding: '16px 24px', textAlign: 'center', color: 'white', fontSize: '13px' }}>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveHistory.map((leave) => (
                            <tr key={leave.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '18px 24px' }}>
                                    <div style={{ fontWeight: '700', color: 'var(--primary-accent)' }}>{leave.type}</div>
                                </td>
                                <td style={{ padding: '18px 24px', color: 'var(--text-secondary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                        <FiCalendar size={14} /> {leave.startDate} to {leave.endDate}
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px', color: 'var(--text-secondary)', fontWeight: '600' }}>{leave.days} Days</td>
                                <td style={{ padding: '18px 24px', color: 'var(--text-light)', fontSize: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiMessageSquare size={14} /> {leave.reason}
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                                    <span style={{ 
                                        padding: '6px 14px', 
                                        borderRadius: '8px', 
                                        fontSize: '12px', 
                                        fontWeight: '800', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '6px',
                                        background: leave.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : leave.status === 'Pending' ? 'rgba(14, 47, 118, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: leave.status === 'Approved' ? 'var(--accent-green)' : leave.status === 'Pending' ? 'var(--primary-accent)' : 'var(--accent-red)'
                                    }}>
                                        {leave.status === 'Approved' ? <FiCheckCircle /> : leave.status === 'Pending' ? <FiClock /> : <FiXCircle />} {leave.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveManagement;
