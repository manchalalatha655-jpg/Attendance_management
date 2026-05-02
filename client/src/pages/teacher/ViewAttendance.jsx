import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiCheckSquare, FiXSquare, FiMinusSquare } from 'react-icons/fi';

const ViewAttendance = () => {
    const [assignments, setAssignments] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get('http://localhost:5000/api/teacher/assignments', config);
                setAssignments(res.data);
                
                if (res.data && res.data.class) {
                    const studentsRes = await axios.get(`http://localhost:5000/api/student/class/${res.data.class._id}`, config);
                    // Mocking total classes and attendance stats for demonstration
                    setStudents(studentsRes.data.map(s => ({ 
                        ...s, 
                        totalClasses: 25,
                        present: true,
                        absent: false,
                        late: false
                    })));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user.token]);

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
                        <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>Select Month</label>
                        <select style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', minWidth: '150px' }}>
                            <option>April 2026</option>
                            <option>May 2026</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: '#555' }}>
                    <span style={{ marginRight: '15px' }}>From: 01-Apr-2026</span>
                    <span>To: 30-Apr-2026</span>
                </div>
                <div style={{ display: 'flex', border: '1px solid #194582', borderRadius: '4px', overflow: 'hidden' }}>
                    <button style={{ padding: '6px 15px', background: '#194582', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Weekly</button>
                    <button style={{ padding: '6px 15px', background: 'white', color: '#194582', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Monthly</button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ background: '#143869', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '15px', borderTopLeftRadius: '6px' }}>Student Name</th>
                        <th style={{ padding: '15px', textAlign: 'center' }}>Total Classes</th>
                        <th style={{ padding: '15px', textAlign: 'center' }}>Present</th>
                        <th style={{ padding: '15px', textAlign: 'center' }}>Absent</th>
                        <th style={{ padding: '15px', textAlign: 'center', borderTopRightRadius: '6px' }}>Late</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, idx) => (
                        <tr key={student._id} style={{ borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                            <td style={{ padding: '15px', color: '#333' }}>{student.name}</td>
                            <td style={{ padding: '15px', textAlign: 'center', color: '#555' }}>{student.totalClasses}</td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <FiCheckSquare color="#27ae60" size={18} />
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <FiXSquare color="#e74c3c" size={18} />
                            </td>
                            <td style={{ padding: '15px', textAlign: 'center' }}>
                                <FiMinusSquare color="#ccc" size={18} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAttendance;
