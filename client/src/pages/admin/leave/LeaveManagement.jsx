import React, { useState } from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiFilter, FiUser } from 'react-icons/fi';

const LeaveManagement = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const mockLeaves = [
        { id: 1, name: 'Dr. Ramesh Kumar', role: 'HOD', dept: 'Computer Science', type: 'Sick Leave', duration: '2 Days', status: 'pending', date: '2026-05-01' },
        { id: 2, name: 'Mrs. Sangeetha', role: 'Teacher', dept: 'Electronics', type: 'Casual Leave', duration: '1 Day', status: 'approved', date: '2026-04-28' },
        { id: 3, name: 'Mr. David Wilson', role: 'HOD', dept: 'Mechanical', type: 'Duty Leave', duration: '3 Days', status: 'pending', date: '2026-05-05' },
    ];

    const filtered = mockLeaves.filter(l => l.status === activeTab || activeTab === 'all');

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>Leave Management</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Review and manage leave applications from staff and HODs.</p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {['pending', 'approved', 'rejected', 'all'].map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        style={{ 
                            padding: '10px 20px', 
                            borderRadius: '12px', 
                            border: 'none',
                            background: activeTab === tab ? 'var(--blue-gradient)' : 'var(--bg-secondary)',
                            color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            boxShadow: activeTab === tab ? '0 4px 12px rgba(37,99,235,0.2)' : 'none',
                            transition: 'all 0.3s'
                        }}
                    >
                        {tab} Requests
                    </button>
                ))}
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '20px', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '800', color: 'var(--text-light)' }}>APPLICANT</th>
                            <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '800', color: 'var(--text-light)' }}>TYPE & DURATION</th>
                            <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '800', color: 'var(--text-light)' }}>DATE</th>
                            <th style={{ padding: '20px', textAlign: 'left', fontSize: '12px', fontWeight: '800', color: 'var(--text-light)' }}>STATUS</th>
                            <th style={{ padding: '20px', textAlign: 'center', fontSize: '12px', fontWeight: '800', color: 'var(--text-light)' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(l => (
                            <tr key={l.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--blue-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>{l.name.charAt(0)}</div>
                                        <div>
                                            <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{l.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{l.role} • {l.dept}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{l.type}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{l.duration}</div>
                                </td>
                                <td style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{l.date}</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ 
                                        padding: '4px 12px', 
                                        borderRadius: '20px', 
                                        fontSize: '11px', 
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        background: l.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : l.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: l.status === 'approved' ? '#10b981' : l.status === 'pending' ? '#f59e0b' : '#ef4444'
                                    }}>
                                        {l.status}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                        <button style={{ border: 'none', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><FiCheckCircle size={18} /></button>
                                        <button style={{ border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><FiXCircle size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default LeaveManagement;
