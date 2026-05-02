import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiPieChart, FiAlertTriangle, FiActivity, FiUsers } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const HODDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHODData = async () => {
            try {
                // In a real app, this would be a dedicated HOD API
                const res = await axios.get(`http://localhost:5000/api/admin/users?department=${user.department}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setSummary(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchHODData();
    }, [user.token, user.department]);

    if (loading) return <div style={{ padding: '40px' }}>Loading Department Stats...</div>;

    const studentCount = summary?.filter(u => u.role === 'student').length || 0;
    const teacherCount = summary?.filter(u => u.role === 'teacher').length || 0;

    const pieData = {
        labels: ['Above 75%', '75% - 60%', 'Below 60%'],
        datasets: [{
            data: [studentCount - 2, 2, 0], // Demo mix
            backgroundColor: ['#00b894', '#ffeaa7', '#ff7675'],
            borderWidth: 0
        }]
    };

    return (
        <div style={{ padding: '40px' }}>
            <h1 style={{ marginBottom: '30px' }}>Department <span className="gradient-text">Head Dashboard</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: '#6c5ce720', color: '#6c5ce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        <FiUsers />
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Total Department Students</p>
                        <h3 style={{ fontSize: '24px' }}>{studentCount}</h3>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', background: '#00b89420', color: '#00b894', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        <FiActivity />
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Department Faculty</p>
                        <h3 style={{ fontSize: '24px' }}>{teacherCount}</h3>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
                <div className="glass-card" style={{ padding: '25px' }}>
                    <h4 style={{ marginBottom: '20px' }}><FiPieChart /> Attendance Status</h4>
                    <div style={{ height: '250px' }}>
                        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
                
                <div className="glass-card" style={{ padding: '25px' }}>
                    <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiAlertTriangle style={{ color: '#e17055' }} /> Low Attendance Watchlist
                    </h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                    <th style={{ padding: '12px' }}>Student</th>
                                    <th style={{ padding: '12px' }}>Roll No</th>
                                    <th style={{ padding: '12px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>Alice Williams</td>
                                    <td style={{ padding: '12px', color: 'var(--text-light)' }}>STU105</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ padding: '4px 10px', background: '#fab1a0', color: '#d63031', borderRadius: '20px', fontSize: '12px' }}>62% (Critical)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>Bob Johnson</td>
                                    <td style={{ padding: '12px', color: 'var(--text-light)' }}>STU109</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ padding: '4px 10px', background: '#ffeaa7', color: '#e17055', borderRadius: '20px', fontSize: '12px' }}>68% (Warning)</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HODDashboard;
