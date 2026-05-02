import React, { useState } from 'react';
import { FiCalendar, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const ManageSessions = () => {
    const [sessions, setSessions] = useState([
        { id: 1, name: '2023/2024', isActive: true },
        { id: 2, name: '2024/2025', isActive: false },
    ]);
    const [terms, setTerms] = useState([
        { id: 1, name: 'First Term', isActive: true },
        { id: 2, name: 'Second Term', isActive: false },
        { id: 3, name: 'Third Term', isActive: false },
    ]);

    return (
        <div>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: '30px',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: '20px'
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', fontWeight: '400' }}>Manage Session & Term</h1>
                    <p style={{ fontSize: '13px', color: '#4e73df', marginTop: '5px' }}>
                        Admin / Session & Term
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Sessions Card */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '5px', padding: '30px', boxShadow: 'var(--shadow)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#4e73df', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiCalendar /> Academic Sessions
                        </h3>
                        <button style={{ padding: '8px 12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12px' }}>
                            <FiPlus /> Add Session
                        </button>
                    </div>
                    
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>Session</th>
                                <th style={{ padding: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>Status</th>
                                <th style={{ padding: '10px', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '12px 10px', fontSize: '14px', color: 'var(--text-primary)' }}>{s.name}</td>
                                    <td style={{ padding: '12px 10px' }}>
                                        <span style={{ 
                                            background: s.isActive ? '#1cc88a' : 'var(--bg-primary)', 
                                            color: s.isActive ? 'white' : 'var(--text-secondary)',
                                            padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold'
                                        }}>
                                            {s.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#f6c23e', cursor: 'pointer', marginRight: '10px' }}><FiEdit2 /></button>
                                        <button style={{ background: 'none', border: 'none', color: '#e74a3b', cursor: 'pointer' }}><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Terms Card */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '5px', padding: '30px', boxShadow: 'var(--shadow)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#4e73df', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiCalendar /> Academic Terms
                        </h3>
                        <button style={{ padding: '8px 12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12px' }}>
                            <FiPlus /> Add Term
                        </button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>Term</th>
                                <th style={{ padding: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>Status</th>
                                <th style={{ padding: '10px', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {terms.map(t => (
                                <tr key={t.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '12px 10px', fontSize: '14px', color: 'var(--text-primary)' }}>{t.name}</td>
                                    <td style={{ padding: '12px 10px' }}>
                                        <span style={{ 
                                            background: t.isActive ? '#1cc88a' : 'var(--bg-primary)', 
                                            color: t.isActive ? 'white' : 'var(--text-secondary)',
                                            padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold'
                                        }}>
                                            {t.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#f6c23e', cursor: 'pointer', marginRight: '10px' }}><FiEdit2 /></button>
                                        <button style={{ background: 'none', border: 'none', color: '#e74a3b', cursor: 'pointer' }}><FiTrash2 /></button>
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

export default ManageSessions;
