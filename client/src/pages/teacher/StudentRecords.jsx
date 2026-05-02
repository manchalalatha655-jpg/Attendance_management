import React, { useState } from 'react';
import { FiSearch, FiUser, FiMail, FiBarChart2, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const StudentRecords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const students = [
        { id: '2023CS01', name: 'Alice Smith', email: 'alice@gmail.com', attendance: '92%', status: 'Regular', class: 'CS-101' },
        { id: '2023CS02', name: 'Bob Johnson', email: 'bob@gmail.com', attendance: '85%', status: 'Regular', class: 'CS-101' },
        { id: '2023CS03', name: 'Charlie Brown', email: 'charlie@gmail.com', attendance: '68%', status: 'Shortage', class: 'CS-102' },
        { id: '2023CS04', name: 'Diana Prince', email: 'diana@gmail.com', attendance: '95%', status: 'Regular', class: 'CS-101' },
        { id: '2023CS05', name: 'Ethan Hunt', email: 'ethan@gmail.com', attendance: '74%', status: 'Shortage', class: 'CS-102' },
    ];

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Student Records</h2>
                    <p style={{ color: 'var(--text-light)' }}>Monitor student performance, attendance history, and academic status.</p>
                </div>
                <div style={{ position: 'relative', width: '300px' }}>
                    <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input 
                        type="text" 
                        placeholder="Search student ID or name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
                    />
                </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'var(--primary-accent)' }}>
                        <tr>
                            <th style={{ padding: '18px 24px', textAlign: 'left', color: 'white', fontWeight: '700', fontSize: '13px' }}>STUDENT</th>
                            <th style={{ padding: '18px 24px', textAlign: 'left', color: 'white', fontWeight: '700', fontSize: '13px' }}>CLASS</th>
                            <th style={{ padding: '18px 24px', textAlign: 'left', color: 'white', fontWeight: '700', fontSize: '13px' }}>ATTENDANCE</th>
                            <th style={{ padding: '18px 24px', textAlign: 'left', color: 'white', fontWeight: '700', fontSize: '13px' }}>STATUS</th>
                            <th style={{ padding: '18px 24px', textAlign: 'center', color: 'white', fontWeight: '700', fontSize: '13px' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((s) => (
                            <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '18px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'var(--bg-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-accent)' }}>
                                            <FiUser size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', color: 'var(--primary-accent)' }}>{s.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{s.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px', color: 'var(--text-secondary)', fontWeight: '600' }}>{s.class}</td>
                                <td style={{ padding: '18px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ flex: 1, height: '6px', background: 'var(--bg-primary)', borderRadius: '10px', maxWidth: '100px', overflow: 'hidden' }}>
                                            <div style={{ width: s.attendance, height: '100%', background: parseInt(s.attendance) > 75 ? 'var(--accent-green)' : 'var(--accent-red)' }} />
                                        </div>
                                        <span style={{ fontWeight: '700', color: 'var(--primary-accent)' }}>{s.attendance}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '18px 24px' }}>
                                    <span style={{ 
                                        padding: '6px 12px', 
                                        borderRadius: '8px', 
                                        fontSize: '12px', 
                                        fontWeight: '700', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '6px',
                                        background: s.status === 'Regular' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: s.status === 'Regular' ? 'var(--accent-green)' : 'var(--accent-red)'
                                    }}>
                                        {s.status === 'Regular' ? <FiCheckCircle /> : <FiXCircle />} {s.status}
                                    </span>
                                </td>
                                <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                                    <button style={{ background: 'var(--bg-primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', color: 'var(--primary-accent)', fontWeight: '700', cursor: 'pointer' }}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentRecords;
