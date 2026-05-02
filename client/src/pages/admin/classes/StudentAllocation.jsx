import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const fieldStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px' };
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' };

const StudentAllocation = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [cr, sr] = await Promise.all([
                    axios.get('http://localhost:5000/api/classes', config),
                    axios.get('http://localhost:5000/api/admin/users', config)
                ]);
                setClasses(cr.data);
                setStudents(sr.data.filter(u => u.role === 'student'));
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [user.token]);

    const handleAllocate = async (e) => {
        e.preventDefault();
        if (!selectedClass || selectedStudents.length === 0) { setMessage('error:Select a class and at least one student.'); return; }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/classes/${selectedClass}/students`, { studentIds: selectedStudents }, config);
            setMessage('success:Students allocated successfully!');
            setSelectedStudents([]);
        } catch { setMessage('error:Failed to allocate students.'); }
    };

    const toggleStudent = (id) => setSelectedStudents(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    const isError = message.startsWith('error:');
    const msgText = message.replace(/^(success:|error:)/, '');

    return (
        <div style={{ maxWidth: '680px' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Student Allocation</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>Assign students to their respective classes.</p>

            {message && (
                <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', marginBottom: '20px', borderRadius: '8px', fontWeight: '500', fontSize: '14px', borderLeft: `4px solid ${isError ? '#ef4444' : '#22c55e'}` }}>
                    {msgText}
                </div>
            )}

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                <form onSubmit={handleAllocate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Select Class</label>
                        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={fieldStyle}>
                            <option value="">-- Choose a class --</option>
                            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ ...labelStyle, marginBottom: '12px' }}>
                            Select Students <span style={{ color: 'var(--text-light)', fontWeight: '400' }}>({selectedStudents.length} selected)</span>
                        </label>
                        {students.length === 0 ? (
                            <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>No students found.</p>
                        ) : (
                            <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', padding: '4px' }}>
                                {students.map(s => (
                                    <label key={s._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: selectedStudents.includes(s._id) ? 'rgba(78,115,223,0.1)' : 'var(--bg-primary)', borderRadius: '6px', cursor: 'pointer', border: `1px solid ${selectedStudents.includes(s._id) ? '#4e73df' : 'transparent'}` }}>
                                        <input type="checkbox" checked={selectedStudents.includes(s._id)} onChange={() => toggleStudent(s._id)} style={{ width: '16px', height: '16px' }} />
                                        <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{s.name}</span>
                                        <span style={{ color: 'var(--text-light)', fontSize: '12px', marginLeft: 'auto' }}>{s.email}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" style={{ padding: '12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
                        Allocate Students
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentAllocation;
