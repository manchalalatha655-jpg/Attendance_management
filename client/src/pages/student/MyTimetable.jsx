import React from 'react';
import { FiClock, FiMapPin, FiCalendar } from 'react-icons/fi';

const MyTimetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
    
    const schedule = [
        { day: 'Monday', time: '09:00 AM', subject: 'Data Structures', room: 'R302' },
        { day: 'Monday', time: '11:00 AM', subject: 'Java Programming', room: 'Lab 01' },
        { day: 'Tuesday', time: '10:00 AM', subject: 'DBMS', room: 'R205' },
        { day: 'Wednesday', time: '09:00 AM', subject: 'Data Structures', room: 'R302' },
        { day: 'Thursday', time: '11:00 AM', subject: 'Java Programming', room: 'Lab 01' },
        { day: 'Friday', time: '02:00 PM', subject: 'DBMS', room: 'R205' },
    ];

    const getEntry = (day, time) => schedule.find(s => s.day === day && s.time === time);

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>My Timetable</h2>
                <p style={{ color: 'var(--text-light)' }}>Track your weekly class schedule and lecture halls.</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflowX: 'auto', boxShadow: 'var(--shadow)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '20px', background: 'var(--primary-accent)', color: 'white', borderRight: '1px solid rgba(255,255,255,0.1)', width: '120px' }}>TIME</th>
                            {days.map(day => (
                                <th key={day} style={{ padding: '20px', background: 'var(--primary-accent)', color: 'white', borderRight: '1px solid rgba(255,255,255,0.1)' }}>{day.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map(time => (
                            <tr key={time}>
                                <td style={{ padding: '20px', textAlign: 'center', fontWeight: '700', color: 'var(--primary-accent)', background: 'rgba(170, 192, 225, 0.2)', borderBottom: '1px solid var(--glass-border)' }}>
                                    {time}
                                </td>
                                {days.map(day => {
                                    const entry = getEntry(day, time);
                                    return (
                                        <td key={day} style={{ padding: '10px', borderRight: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', height: '100px' }}>
                                            {entry ? (
                                                <div style={{ 
                                                    background: 'var(--primary-accent)', 
                                                    color: 'white', 
                                                    padding: '12px', 
                                                    borderRadius: '12px', 
                                                    fontSize: '12px',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 10px rgba(14, 47, 118, 0.2)'
                                                }}>
                                                    <div style={{ fontWeight: '800', marginBottom: '4px' }}>{entry.subject}</div>
                                                    <div style={{ marginTop: '6px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
                                                        <FiMapPin size={10} /> {entry.room}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTimetable;
