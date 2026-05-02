import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiCalendar } from 'react-icons/fi';

const MarkAttendance = () => {
    const [assignments, setAssignments] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get('http://localhost:5000/api/teacher/assignments', config);
                setAssignments(res.data);
                
                if (res.data && res.data.class) {
                    const studentsRes = await axios.get(`http://localhost:5000/api/student/class/${res.data.class._id}`, config);
                    // Initialize all students as Present by default (as seen in many systems)
                    setStudents(studentsRes.data.map(s => ({ ...s, status: 'Present' })));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user.token]);

    const handleStatusChange = (studentId, newStatus) => {
        setStudents(students.map(s => s._id === studentId ? { ...s, status: newStatus } : s));
    };

    const submitAttendance = async () => {
        try {
            if (!assignments || !assignments.class || !assignments.subjects[0]) {
                alert('No class or subject assigned!');
                return;
            }

            const attendanceData = {
                students: students.map(s => ({ studentId: s._id, status: s.status })),
                subjectId: assignments.subjects[0]._id,
                classId: assignments.class._id,
                date: selectedDate
            };
            await axios.post('http://localhost:5000/api/teacher/attendance', attendanceData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Attendance submitted successfully!');
        } catch (err) {
            alert('Error submitting attendance');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                        <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>Select Class</label>
                        <select style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', minWidth: '150px' }}>
                            <option>{assignments?.class?.name || 'Loading...'}</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>Select Subject</label>
                        <select style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', minWidth: '150px' }}>
                            {assignments?.subjects?.map(sub => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8f9fa', padding: '10px 15px', borderRadius: '6px', border: '1px solid #eee' }}>
                    <FiCalendar color="#666" />
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{ border: 'none', background: 'transparent', outline: 'none', color: '#333', fontSize: '14px' }}
                    />
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ background: '#143869', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '15px', borderTopLeftRadius: '6px' }}>Student Name</th>
                        <th style={{ padding: '15px', textAlign: 'center' }}>Present</th>
                        <th style={{ padding: '15px', textAlign: 'center' }}>Absent</th>
                        <th style={{ padding: '15px', textAlign: 'center', borderTopRightRadius: '6px' }}>Late</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, idx) => (
                        <tr key={student._id} style={{ borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                            <td style={{ padding: '15px', color: '#333' }}>{student.name}</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <input 
                                    type="checkbox" 
                                    checked={student.status === 'Present'}
                                    onChange={() => handleStatusChange(student._id, 'Present')}
                                    style={{ width: '18px', height: '18px', accentColor: '#27ae60', cursor: 'pointer' }}
                                />
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <input 
                                    type="checkbox" 
                                    checked={student.status === 'Absent'}
                                    onChange={() => handleStatusChange(student._id, 'Absent')}
                                    style={{ width: '18px', height: '18px', accentColor: '#e74c3c', cursor: 'pointer' }}
                                />
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <input 
                                    type="checkbox" 
                                    checked={student.status === 'Late'}
                                    onChange={() => handleStatusChange(student._id, 'Late')}
                                    style={{ width: '18px', height: '18px', accentColor: '#f39c12', cursor: 'pointer' }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ textAlign: 'center' }}>
                <button onClick={submitAttendance} style={{
                    padding: '12px 30px',
                    background: '#194582',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                    Submit Attendance
                </button>
            </div>
        </div>
    );
};

export default MarkAttendance;
