import React from 'react';
import { FiBook, FiUsers, FiUser, FiClock, FiMapPin, FiBarChart } from 'react-icons/fi';

const DeptClasses = () => {
    const classes = [
        { id: 1, name: 'CSE - 2nd Year', section: 'A', faculty: 'Dr. Navyasree', students: 64, attendance: '82%', subject: 'Data Structures' },
        { id: 2, name: 'CSE - 2nd Year', section: 'B', faculty: 'Prof. Rajesh', students: 60, attendance: '78%', subject: 'Java Programming' },
        { id: 3, name: 'CSE - 3rd Year', section: 'A', faculty: 'Dr. Robert', students: 58, attendance: '85%', subject: 'DBMS' },
        { id: 4, name: 'CSE - 4th Year', section: 'A', faculty: 'Prof. Latha', students: 55, attendance: '92%', subject: 'Network Security' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Department Classes</h2>
                    <p style={{ color: 'var(--text-light)' }}>Overview of all academic classes and assigned faculty in the CSE department.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '10px' }}>Add New Class</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                {classes.map((cls) => (
                    <div key={cls.id} style={{ 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '24px', 
                        padding: '24px', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow)',
                        transition: 'all 0.3s'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '4px' }}>{cls.name}</h3>
                                <div style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: '700' }}>Section {cls.section}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: parseInt(cls.attendance) > 80 ? 'var(--accent-green)' : 'var(--primary-accent)' }}>{cls.attendance}</div>
                                <div style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase' }}>Avg Attendance</div>
                            </div>
                        </div>

                        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                                <FiUser style={{ color: 'var(--primary-accent)' }} /> <span>Faculty: <strong>{cls.faculty}</strong></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                                <FiBook style={{ color: 'var(--primary-accent)' }} /> <span>Subject: <strong>{cls.subject}</strong></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                <FiUsers style={{ color: 'var(--primary-accent)' }} /> <span>Enrollment: <strong>{cls.students} Students</strong></span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'var(--primary-accent)', color: 'white', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>View Details</button>
                            <button style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'transparent', border: '1px solid var(--primary-accent)', color: 'var(--primary-accent)', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Performance</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeptClasses;
