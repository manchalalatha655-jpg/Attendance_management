import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiActivity, FiPieChart, FiTrendingUp, FiArrowUpRight, FiDownload, FiMaximize } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useReactToPrint } from 'react-to-print';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StudentDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Attendance_Report_${user.name}`,
    });

    const fetchAttendance = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/student/attendance', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [user.token]);

    const handleQRCheckin = async () => {
        const mockQRData = {
            classId: '6625fb49e4b0c268a15668b2',
            subjectId: '6625fb49e4b0c268a15668b5'
        };

        try {
            await axios.post('http://localhost:5000/api/student/attendance/qr', mockQRData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Check-in successful! Your attendance has been marked.');
            fetchAttendance();
        } catch (err) {
            alert('Check-in failed. Please try again or mark manually with your teacher.');
        }
    };

    if (loading) return <div style={{ padding: '40px' }}>Loading Stats...</div>;

    const overallPct = data?.stats.reduce((acc, curr) => acc + parseFloat(curr.percentage), 0) / (data?.stats.length || 1);

    const chartData = {
        labels: data?.stats.map(s => s.name),
        datasets: [{
            label: 'Attendance %',
            data: data?.stats.map(s => parseFloat(s.percentage)),
            backgroundColor: [
                '#6c5ce7', '#00b894', '#0984e3', '#e17055', '#fdcb6e', '#d63031'
            ],
            borderWidth: 0,
        }]
    };

    return (
        <div style={{ padding: '40px', background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px' }}>Student <span className="gradient-text">Insights</span></h1>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={handleQRCheckin} style={{
                        padding: '12px 20px',
                        background: 'var(--secondary-gradient)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow)',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        <FiMaximize /> Check-in via QR
                    </button>
                    <button onClick={handlePrint} style={{
                        padding: '12px 20px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow)',
                        cursor: 'pointer'
                    }}>
                        <FiDownload /> Export PDF
                    </button>
                </div>
            </div>

            <div ref={componentRef}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                    <div className="card animate-fade-in" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ color: 'var(--text-light)', marginBottom: '10px' }}>Overall Percentage</p>
                                <h2 style={{ fontSize: '36px', fontWeight: '800' }}>{overallPct.toFixed(1)}%</h2>
                            </div>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                <FiActivity style={{ margin: 'auto' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', height: '8px', background: 'var(--bg-primary)', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: `${overallPct}%`, height: '100%', background: 'var(--primary-gradient)' }}></div>
                        </div>
                    </div>

                    <div className="card animate-fade-in" style={{ padding: '30px', animationDelay: '0.1s' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ color: 'var(--text-light)', marginBottom: '10px' }}>Attendance Status</p>
                                <h2 style={{ fontSize: '24px', fontWeight: '700', color: overallPct >= 75 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                    {overallPct >= 75 ? 'On Track' : 'Shortage'}
                                </h2>
                            </div>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                <FiTrendingUp style={{ margin: 'auto' }} />
                            </div>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--text-light)' }}>
                            <FiArrowUpRight /> Keep it above 75% for exam eligibility
                        </p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginBottom: '30px' }}>
                    <div className="card" style={{ padding: '30px' }}>
                        <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Attendance Distribution</h3>
                        <div style={{ maxWidth: '250px', margin: '0 auto' }}>
                            <Doughnut data={chartData} options={{ cutout: '70%', plugins: { legend: { labels: { color: 'var(--text-secondary)' } } } }} />
                        </div>
                    </div>

                    <div className="card" style={{ padding: '30px' }}>
                        <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}><FiPieChart /> Subject-wise Breakdown</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                            {data?.stats.map((stat, index) => (
                                <div key={index} style={{ padding: '15px', border: '1px solid var(--glass-border)', borderRadius: '12px', textAlign: 'center', background: 'var(--bg-primary)' }}>
                                    <p style={{ fontWeight: '600', marginBottom: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>{stat.name}</p>
                                    <div style={{ fontSize: '20px', fontWeight: '800' }} className="gradient-text">{stat.percentage}%</div>
                                    <p style={{ fontSize: '11px', color: 'var(--text-light)' }}>{stat.present}/{stat.total} Classes</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: '30px', marginTop: '30px' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Recent Logs</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Date</th>
                                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Subject</th>
                                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Faculty</th>
                                <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.attendance.map((log, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{new Date(log.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{log.subject.name}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{log.teacher.name}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            background: log.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: log.status === 'Present' ? 'var(--accent-green)' : 'var(--accent-red)',
                                            fontWeight: '700'
                                        }}>
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
