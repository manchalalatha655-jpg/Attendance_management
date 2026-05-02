import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const fieldStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px' };
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' };

const AssignTeacher = () => {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [cr, tr] = await Promise.all([
                    axios.get('http://localhost:5000/api/classes', config),
                    axios.get('http://localhost:5000/api/admin/teachers-manage', config)
                ]);
                setClasses(cr.data);
                setTeachers(tr.data);
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [user.token]);

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!selectedClass || !selectedTeacher) { setMessage('error:Please select both a class and teacher.'); return; }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/classes/${selectedClass}/assign-teacher`, { teacherId: selectedTeacher }, config);
            setMessage('success:Teacher assigned to class successfully!');
        } catch { setMessage('error:Failed to assign teacher.'); }
    };

    const isError = message.startsWith('error:');
    const msgText = message.replace(/^(success:|error:)/, '');

    return (
        <div style={{ maxWidth: '620px' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Assign Teacher to Class</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>Select a class and assign a teacher to manage it.</p>

            {message && (
                <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', marginBottom: '20px', borderRadius: '8px', fontWeight: '500', fontSize: '14px', borderLeft: `4px solid ${isError ? '#ef4444' : '#22c55e'}` }}>
                    {msgText}
                </div>
            )}

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                <form onSubmit={handleAssign} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Select Class</label>
                        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={fieldStyle}>
                            <option value="">-- Choose a class --</option>
                            {classes.map(c => <option key={c._id} value={c._id}>{c.name} {c.section ? `— Section ${c.section}` : ''}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Select Teacher</label>
                        <select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)} style={fieldStyle}>
                            <option value="">-- Choose a teacher --</option>
                            {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                        </select>
                    </div>
                    <button type="submit" style={{ padding: '12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
                        Assign Teacher
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AssignTeacher;
