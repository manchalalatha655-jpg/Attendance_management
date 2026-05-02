import React from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiUser, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const LeaveRequests = () => {
    const requests = [
        { id: 1, name: 'Prof. John Doe', role: 'Faculty', type: 'Casual Leave', dates: 'May 10 - May 11', reason: 'Family event', status: 'Pending' },
        { id: 2, name: 'Alice Smith', role: 'Student', type: 'Medical', dates: 'May 12', reason: 'Health issues', status: 'Pending' },
        { id: 3, name: 'Dr. Robert', role: 'Faculty', type: 'Sick Leave', dates: 'May 05 - May 06', reason: 'Fever', status: 'Approved' },
        { id: 4, name: 'Charlie Brown', role: 'Student', type: 'Personal', dates: 'May 04', reason: 'Exam', status: 'Rejected' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Leave Requests</h2>
                <p style={{ color: 'var(--text-light)' }}>Manage and review leave applications from department faculty and students.</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(14, 47, 118, 0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)' }}>Pending Approvals</h3>
                    <div style={{ background: 'var(--accent-red)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '800' }}>2 New Requests</div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'var(--primary-accent)' }}>
                        <tr>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '12px' }}>APPLICANT</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '12px' }}>LEAVE INFO</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '12px' }}>REASON</th>
                            <th style={{ padding: '16px 24px', textAlign: 'center', color: 'white', fontSize: '12px' }}>STATUS</th>
                            <th style={{ padding: '16px 24px', textAlign: 'center', color: 'white', fontSize: '12px' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '18px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '36px', height: '36px', background: 'var(--bg-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-accent)' }}>
                                            <FiUser />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', color: 'var(--primary-accent)', fontSize: '14px' }}>{req.name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600' }}>{req.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px' }}>
                                    <div style={{ fontWeight: '700', color: 'var(--text-secondary)', fontSize: '13px' }}>{req.type}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FiCalendar size={12} /> {req.dates}
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px', color: 'var(--text-light)', fontSize: '13px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiMessageSquare size={14} /> {req.reason}
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                                    <span style={{ 
                                        padding: '4px 12px', 
                                        borderRadius: '8px', 
                                        fontSize: '11px', 
                                        fontWeight: '800', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '6px',
                                        background: req.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : req.status === 'Pending' ? 'rgba(14, 47, 118, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: req.status === 'Approved' ? 'var(--accent-green)' : req.status === 'Pending' ? 'var(--primary-accent)' : 'var(--accent-red)'
                                    }}>
                                        {req.status === 'Approved' ? <FiCheckCircle /> : req.status === 'Pending' ? <FiClock /> : <FiXCircle />} {req.status}
                                    </span>
                                </td>
                                <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                                    {req.status === 'Pending' ? (
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button style={{ background: 'var(--accent-green)', border: 'none', padding: '6px 12px', borderRadius: '6px', color: 'white', cursor: 'pointer' }}><FiCheckCircle /></button>
                                            <button style={{ background: 'var(--accent-red)', border: 'none', padding: '6px 12px', borderRadius: '6px', color: 'white', cursor: 'pointer' }}><FiXCircle /></button>
                                        </div>
                                    ) : (
                                        <button style={{ background: 'var(--bg-primary)', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', cursor: 'pointer' }}>View History</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveRequests;
