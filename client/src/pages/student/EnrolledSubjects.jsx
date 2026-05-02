import React from 'react';
import { FiBookOpen, FiUser, FiAward, FiClock } from 'react-icons/fi';

const EnrolledSubjects = () => {
    const subjects = [
        { id: 1, code: 'CS101', name: 'Data Structures', instructor: 'Prof. Navyasree', credits: 4, type: 'Core' },
        { id: 2, code: 'CS102', name: 'Java Programming', instructor: 'Dr. Smith', credits: 3, type: 'Core' },
        { id: 3, code: 'MA201', name: 'Advanced Mathematics', instructor: 'Prof. Johnson', credits: 4, type: 'Foundation' },
        { id: 4, code: 'HU101', name: 'Professional Ethics', instructor: 'Ms. Alice', credits: 2, type: 'Elective' },
        { id: 5, code: 'CS203', name: 'DBMS', instructor: 'Dr. Robert', credits: 3, type: 'Core' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Enrolled Subjects</h2>
                <p style={{ color: 'var(--text-light)' }}>List of academic subjects you are currently enrolled in for this semester.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {subjects.map((sub) => (
                    <div key={sub.id} style={{ 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '20px', 
                        padding: '24px', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow)',
                        transition: 'all 0.3s'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-accent)' }}>
                                <FiBookOpen size={24} />
                            </div>
                            <span style={{ 
                                padding: '6px 12px', 
                                borderRadius: '8px', 
                                fontSize: '12px', 
                                fontWeight: '700',
                                background: sub.type === 'Core' ? 'rgba(14, 47, 118, 0.1)' : 'rgba(170, 192, 225, 0.2)',
                                color: 'var(--primary-accent)'
                            }}>{sub.type}</span>
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '4px' }}>{sub.name}</h3>
                        <div style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: '600', marginBottom: '16px' }}>Code: {sub.code}</div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <FiUser style={{ color: 'var(--primary-accent)' }} /> <span>{sub.instructor}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <FiAward style={{ color: 'var(--primary-accent)' }} /> <span>{sub.credits} Academic Credits</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrolledSubjects;
