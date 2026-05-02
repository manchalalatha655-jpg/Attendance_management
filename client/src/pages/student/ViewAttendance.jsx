import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';

const ViewAttendance = () => {
    const records = [
        { subject: 'Mathematics', date: 'April 11', status: 'Present' },
        { subject: 'English', date: 'April 12', status: 'Present' },
        { subject: 'History', date: 'April 13', status: 'Present' },
        { subject: 'Science', date: 'April 14', status: 'Present' },
    ];

    return (
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                    <button style={{ padding: '8px 15px', background: '#194582', color: 'white', border: 'none', cursor: 'pointer' }}>Weekly</button>
                    <button style={{ padding: '8px 15px', background: 'white', color: '#666', border: 'none', borderLeft: '1px solid #ddd', cursor: 'pointer' }}>Monthly</button>
                    <button style={{ padding: '8px 15px', background: 'white', color: '#666', border: 'none', borderLeft: '1px solid #ddd', cursor: 'pointer' }}>Semester</button>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', color: '#555' }}>Select Range</label>
                <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minWidth: '150px' }}>
                    <option>Weekly</option>
                </select>
                <div style={{ display: 'flex', gap: '5px', marginLeft: 'auto' }}>
                    <button style={{ padding: '5px 10px', border: '1px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer' }}>▲</button>
                    <button style={{ padding: '5px 10px', border: '1px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer' }}>▶</button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee' }}>
                <div style={{ fontSize: '14px', color: '#555' }}>
                    <span style={{ marginRight: '20px' }}>From: 11-Apr-2021</span>
                    <span>To: 17-Apr-2021</span>
                </div>
                <div style={{ display: 'flex', border: '1px solid #194582', borderRadius: '4px', overflow: 'hidden' }}>
                    <button style={{ padding: '6px 15px', background: '#194582', color: 'white', border: 'none', fontSize: '12px' }}>Weekly</button>
                    <button style={{ padding: '6px 15px', background: 'white', color: '#194582', border: 'none', fontSize: '12px' }}>Monthly</button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#143869', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px 15px' }}>Subject</th>
                        <th style={{ padding: '12px 15px' }}>Date</th>
                        <th style={{ padding: '12px 15px' }}>Status</th>
                        <th style={{ padding: '12px 15px', textAlign: 'center' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                            <td style={{ padding: '12px 15px', color: '#333' }}>{record.subject}</td>
                            <td style={{ padding: '12px 15px', color: '#555' }}>{record.date}</td>
                            <td style={{ padding: '12px 15px', color: '#27ae60', fontWeight: '500' }}>{record.status}</td>
                            <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                                <FiCheckSquare color="#27ae60" size={18} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAttendance;
