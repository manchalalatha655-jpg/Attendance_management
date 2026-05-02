import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const fieldStyle = { width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)', fontSize: '14px' };
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' };

const AssignSubjects = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
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

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!selectedClass || !subjectName) { setMessage('error:Please select a class and enter a subject name.'); return; }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/classes/${selectedClass}/subjects`, { name: subjectName, code: subjectCode }, config);
            setMessage('success:Subject added to class successfully!');
            setSubjectName(''); setSubjectCode('');
        } catch { setMessage('error:Failed to assign subject.'); }
    };

    const isError = message.startsWith('error:');
    const msgText = message.replace(/^(success:|error:)/, '');

    return (
        <div style={{ maxWidth: '620px' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Assign Subjects to Class</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>Add subjects to a selected class.</p>

            {message && (
                <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', marginBottom: '20px', borderRadius: '8px', fontWeight: '500', fontSize: '14px', borderLeft: `4px solid ${isError ? '#ef4444' : '#22c55e'}` }}>
                    {msgText}
                </div>
            )}

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                <form onSubmit={handleAssign} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                        <label style={labelStyle}>Select Class</label>
                        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={fieldStyle}>
                            <option value="">-- Choose a class --</option>
                            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Subject Name</label>
                        <input type="text" placeholder="e.g. Data Structures" value={subjectName} onChange={e => setSubjectName(e.target.value)} required style={fieldStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Subject Code <span style={{ color: 'var(--text-light)', fontWeight: '400' }}>(optional)</span></label>
                        <input type="text" placeholder="e.g. CS301" value={subjectCode} onChange={e => setSubjectCode(e.target.value)} style={fieldStyle} />
                    </div>
                    <button type="submit" style={{ padding: '12px', background: '#4e73df', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
                        Add Subject
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AssignSubjects;
