import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const fieldStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px' };
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' };

const AssignSubjectsTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [tr, sr] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/teachers-manage', config),
                    axios.get('http://localhost:5000/api/admin/subjects', config).catch(() => ({ data: [] }))
                ]);
                setTeachers(tr.data);
                setSubjects(sr.data);
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [user.token]);

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!selectedTeacher) { setMessage('error:Please select a teacher.'); return; }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/admin/teachers-manage/${selectedTeacher}/subjects`, { subjectIds: selectedSubjects }, config);
            setMessage('success:Subjects assigned successfully!');
        } catch { setMessage('error:Failed to assign subjects.'); }
    };

    const toggleSubject = (id) => setSelectedSubjects(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    const isError = message.startsWith('error:');
    const msgText = message.replace(/^(success:|error:)/, '');

    return (
        <div style={{ maxWidth: '620px' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Assign Subjects to Teacher</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>Select a teacher and choose the subjects to assign.</p>

            {message && (
                <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', marginBottom: '20px', borderRadius: '8px', fontWeight: '500', fontSize: '14px', borderLeft: `4px solid ${isError ? '#ef4444' : '#22c55e'}` }}>
                    {msgText}
                </div>
            )}

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                <form onSubmit={handleAssign} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Select Teacher</label>
                        <select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)} style={fieldStyle}>
                            <option value="">-- Choose a teacher --</option>
                            {teachers.map(t => <option key={t._id} value={t._id}>{t.name} ({t.email})</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ ...labelStyle, marginBottom: '12px' }}>Select Subjects</label>
                        {subjects.length === 0 ? (
                            <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>No subjects available. Add subjects first.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {subjects.map(s => (
                                    <label key={s._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'var(--bg-primary)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-primary)' }}>
                                        <input type="checkbox" checked={selectedSubjects.includes(s._id)} onChange={() => toggleSubject(s._id)} style={{ width: '16px', height: '16px' }} />
                                        <span style={{ fontWeight: '500' }}>{s.name}</span>
                                        <span style={{ color: 'var(--text-light)', fontSize: '12px' }}>({s.code})</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" style={{ padding: '12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
                        Assign Subjects
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AssignSubjectsTeacher;
