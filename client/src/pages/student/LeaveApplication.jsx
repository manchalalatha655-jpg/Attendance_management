import React, { useState } from 'react';
import { FiPlus, FiClock, FiCheckCircle, FiXCircle, FiCalendar, FiFileText } from 'react-icons/fi';

const LeaveApplication = () => {
    const [showForm, setShowForm] = useState(false);
    
    const leaveHistory = [
        { id: 1, type: 'Personal', startDate: '2024-05-15', endDate: '2024-05-15', days: 1, status: 'Approved', reason: 'Family function' },
        { id: 2, type: 'Medical', startDate: '2024-04-10', endDate: '2024-04-12', days: 3, status: 'Approved', reason: 'Severe fever' },
        { id: 3, type: 'Personal', startDate: '2024-05-28', endDate: '2024-05-28', days: 1, status: 'Pending', reason: 'Competitive exam' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Leave Application</h2>
                    <p style={{ color: 'var(--text-light)' }}>Apply for academic leave and monitor approval status from your HOD.</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px' }}>
                    <FiPlus /> New Application
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Statistics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>Leaves This Semester</div>
                        <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--primary-accent)' }}>05</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>Medical Threshold</div>
                        <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--accent-green)' }}>100%</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>Genuine medical leaves don't affect shortage</div>
                    </div>
                </div>

                {/* History Table */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(14, 47, 118, 0.03)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)' }}>Application History</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--primary-accent)' }}>
                            <tr>
                                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'white', fontSize: '12px' }}>TYPE</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'white', fontSize: '12px' }}>DATES</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', color: 'white', fontSize: '12px' }}>REASON</th>
                                <th style={{ padding: '16px 20px', textAlign: 'center', color: 'white', fontSize: '12px' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveHistory.map((leave) => (
                                <tr key={leave.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ fontWeight: '700', color: 'var(--primary-accent)', fontSize: '14px' }}>{leave.type}</div>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <FiCalendar size={14} /> {leave.startDate}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px', color: 'var(--text-light)', fontSize: '13px' }}>{leave.reason}</td>
                                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                        <span style={{ 
                                            padding: '4px 10px', 
                                            borderRadius: '6px', 
                                            fontSize: '11px', 
                                            fontWeight: '800', 
                                            display: 'inline-flex', 
                                            alignItems: 'center', 
                                            gap: '4px',
                                            background: leave.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(14, 47, 118, 0.1)',
                                            color: leave.status === 'Approved' ? 'var(--accent-green)' : 'var(--primary-accent)'
                                        }}>
                                            {leave.status === 'Approved' ? <FiCheckCircle /> : <FiClock />} {leave.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaveApplication;
