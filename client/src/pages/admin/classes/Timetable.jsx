import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

const fieldStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px' };
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' };

const Timetable = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [timetable, setTimetable] = useState([]);
    const [newEntry, setNewEntry] = useState({ day: 'Monday', period: '9:00 AM', subject: '', teacher: '' });
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get('http://localhost:5000/api/classes', config);
                setClasses(res.data);
            } catch (err) { console.error(err); }
        };
        fetchClasses();
    }, [user.token]);

    useEffect(() => {
        if (!selectedClass) { setTimetable([]); return; }
        const fetchTimetable = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get(`http://localhost:5000/api/classes/${selectedClass}/timetable`, config);
                setTimetable(res.data || []);
            } catch { setTimetable([]); }
        };
        fetchTimetable();
    }, [selectedClass, user.token]);

    const addEntry = () => {
        if (!newEntry.subject) { setMessage('error:Subject is required.'); return; }
        setTimetable(prev => [...prev, { ...newEntry, id: Date.now() }]);
        setNewEntry(e => ({ ...e, subject: '', teacher: '' }));
        setMessage('');
    };

    const removeEntry = (id) => setTimetable(prev => prev.filter(e => e.id !== id));

    const saveTimetable = async () => {
        if (!selectedClass) { setMessage('error:Select a class first.'); return; }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/classes/${selectedClass}/timetable`, { timetable }, config);
            setMessage('success:Timetable saved successfully!');
        } catch { setMessage('error:Failed to save timetable.'); }
    };

    const isError = message.startsWith('error:');
    const msgText = message.replace(/^(success:|error:)/, '');

    return (
        <div>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Timetable Manager</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>Build and manage class schedules.</p>

            {message && (
                <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', marginBottom: '20px', borderRadius: '8px', fontWeight: '500', fontSize: '14px', borderLeft: `4px solid ${isError ? '#ef4444' : '#22c55e'}` }}>
                    {msgText}
                </div>
            )}

            {/* Class Selector */}
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '20px', boxShadow: 'var(--shadow)', marginBottom: '24px' }}>
                <label style={labelStyle}>Select Class</label>
                <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ ...fieldStyle, maxWidth: '400px' }}>
                    <option value="">-- Choose a class --</option>
                    {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
            </div>

            {/* Add Entry */}
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '24px', boxShadow: 'var(--shadow)', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>Add Period</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '14px', alignItems: 'end' }}>
                    <div>
                        <label style={labelStyle}>Day</label>
                        <select value={newEntry.day} onChange={e => setNewEntry(n => ({ ...n, day: e.target.value }))} style={fieldStyle}>
                            {DAYS.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Period</label>
                        <select value={newEntry.period} onChange={e => setNewEntry(n => ({ ...n, period: e.target.value }))} style={fieldStyle}>
                            {PERIODS.map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Subject</label>
                        <input type="text" placeholder="Subject name" value={newEntry.subject} onChange={e => setNewEntry(n => ({ ...n, subject: e.target.value }))} style={fieldStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Teacher</label>
                        <input type="text" placeholder="Teacher name" value={newEntry.teacher} onChange={e => setNewEntry(n => ({ ...n, teacher: e.target.value }))} style={fieldStyle} />
                    </div>
                </div>
                <button onClick={addEntry} style={{ marginTop: '16px', padding: '10px 20px', background: '#1cc88a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiPlus /> Add Period
                </button>
            </div>

            {/* Timetable View */}
            {timetable.length > 0 && (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '24px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>Schedule ({timetable.length} periods)</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-primary)', borderBottom: '2px solid var(--glass-border)' }}>
                                    {['Day', 'Period', 'Subject', 'Teacher', ''].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--admin-primary)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.map(e => (
                                    <tr key={e.id || e._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '10px 14px', fontWeight: '600', color: 'var(--text-primary)' }}>{e.day}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{e.period}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--text-primary)' }}>{e.subject}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{e.teacher || '—'}</td>
                                        <td style={{ padding: '10px 14px' }}>
                                            <button onClick={() => removeEntry(e.id || e._id)} style={{ border: 'none', background: 'none', color: '#e74a3b', cursor: 'pointer', fontSize: '16px' }}><FiTrash2 /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={saveTimetable} style={{ marginTop: '20px', padding: '12px 24px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
                        Save Timetable
                    </button>
                </div>
            )}
        </div>
    );
};

export default Timetable;
