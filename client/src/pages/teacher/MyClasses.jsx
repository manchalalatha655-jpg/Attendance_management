import React from 'react';
import { FiUsers, FiBook, FiClock, FiMapPin, FiCalendar } from 'react-icons/fi';

const MyClasses = () => {
    const classes = [
        { id: 1, name: 'CS-101', section: 'Section A', subject: 'Data Structures', students: 45, room: 'Room 302', time: '09:00 AM - 10:00 AM' },
        { id: 2, name: 'CS-102', section: 'Section B', subject: 'Java Programming', students: 42, room: 'Lab 01', time: '11:00 AM - 12:00 PM' },
        { id: 3, name: 'CS-203', section: 'Section A', subject: 'Database Management', students: 38, room: 'Room 205', time: '02:00 PM - 03:00 PM' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>My Assigned Classes</h2>
                <p style={{ color: 'var(--text-light)' }}>Manage and view all classes assigned to you for the current semester.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                {classes.map((cls) => (
                    <div key={cls.id} style={{ 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '20px', 
                        padding: '24px', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow)',
                        transition: 'all 0.3s'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '4px' }}>{cls.name} — {cls.section}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-blue)', fontWeight: '600', fontSize: '14px' }}>
                                    <FiBook /> {cls.subject}
                                </div>
                            </div>
                            <div style={{ background: 'var(--bg-primary)', padding: '8px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: 'var(--primary-accent)' }}>
                                <FiUsers style={{ marginRight: '6px' }} /> {cls.students} Students
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '14px' }}>
                                <FiClock /> <span>{cls.time}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '14px' }}>
                                <FiMapPin /> <span>{cls.room}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '14px' }}>
                                <FiCalendar /> <span>Mon, Wed, Fri</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn-primary" style={{ flex: 1, padding: '12px', fontSize: '14px', borderRadius: '12px' }}>Mark Attendance</button>
                            <button style={{ 
                                flex: 1, 
                                padding: '12px', 
                                fontSize: '14px', 
                                borderRadius: '12px', 
                                background: 'transparent', 
                                border: '1px solid var(--primary-accent)', 
                                color: 'var(--primary-accent)',
                                fontWeight: '700',
                                cursor: 'pointer'
                            }}>View List</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClasses;
