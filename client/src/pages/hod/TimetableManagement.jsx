import React from 'react';
import { FiCalendar, FiClock, FiEdit3, FiEye, FiDownload, FiPlus } from 'react-icons/fi';

const TimetableManagement = () => {
    const timelines = [
        { id: 1, year: '2nd Year', section: 'A', status: 'Active', lastModified: '2024-05-01' },
        { id: 2, year: '2nd Year', section: 'B', status: 'Active', lastModified: '2024-05-02' },
        { id: 3, year: '3rd Year', section: 'A', status: 'Draft', lastModified: '2024-05-10' },
        { id: 4, year: '4th Year', section: 'A', status: 'Active', lastModified: '2024-04-20' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Timetable Management</h2>
                    <p style={{ color: 'var(--text-light)' }}>Configure and manage class schedules for the entire department.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px' }}>
                    <FiPlus /> Create New Timetable
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {timelines.map((time) => (
                    <div key={time.id} style={{ 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '24px', 
                        padding: '24px', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow)',
                        transition: 'all 0.3s'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-accent)' }}>
                                <FiCalendar size={24} />
                            </div>
                            <span style={{ 
                                padding: '6px 12px', 
                                borderRadius: '8px', 
                                fontSize: '11px', 
                                fontWeight: '800', 
                                background: time.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(14, 47, 118, 0.1)',
                                color: time.status === 'Active' ? 'var(--accent-green)' : 'var(--primary-accent)'
                            }}>{time.status}</span>
                        </div>

                        <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '4px' }}>{time.year}</h3>
                        <div style={{ fontSize: '14px', color: 'var(--primary-blue)', fontWeight: '700', marginBottom: '20px' }}>Section {time.section}</div>

                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span>Last Updated:</span> <strong>{time.lastModified}</strong>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Total Hours:</span> <strong>32 hrs / week</strong>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--primary-accent)', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                                <FiEye size={16} /> View
                            </button>
                            <button style={{ background: 'var(--bg-primary)', color: 'var(--primary-accent)', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                                <FiEdit3 size={16} />
                            </button>
                            <button style={{ background: 'var(--bg-primary)', color: 'var(--primary-accent)', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                                <FiDownload size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimetableManagement;
