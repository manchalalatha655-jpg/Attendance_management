import React from 'react';
import { FiUsers, FiCheckSquare, FiBookOpen, FiClock, FiAlertTriangle, FiCheckCircle, FiBook, FiPieChart, FiActivity } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const DashboardHome = () => {
    const stats = [
        { title: 'Total Assigned Classes', value: '4', icon: <FiBookOpen />, color: 'var(--primary-blue)', bg: 'rgba(37, 99, 235, 0.1)' },
        { title: 'Total Students', value: '180', icon: <FiUsers />, color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
        { title: "Today's Sessions", value: '3', icon: <FiClock />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
        { title: 'Attendance Progress', value: '2/3', icon: <FiCheckSquare />, color: '#0891b2', bg: 'rgba(8, 145, 178, 0.1)' },
        { title: 'Pending Leave', value: '5', icon: <FiClock />, color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
        { title: 'Low Attendance', value: '12', icon: <FiAlertTriangle />, color: 'var(--accent-red)', bg: 'rgba(239, 68, 68, 0.1)' }
    ];

    const barData = {
        labels: ['CSE-A', 'CSE-B', 'ECE-A', 'MECH-B'],
        datasets: [{
            label: 'Attendance %',
            data: [92, 85, 78, 88],
            backgroundColor: ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa'],
            borderRadius: 8,
            barThickness: 40
        }]
    };

    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
            label: 'Attendance Trend',
            data: [85, 88, 86, 90, 84, 89],
            borderColor: 'var(--primary-blue)',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: 'var(--bg-secondary)',
            pointBorderColor: 'var(--primary-blue)',
            pointBorderWidth: 2
        }]
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Faculty Dashboard</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Welcome back! Here's a snapshot of your academic schedule and student performance.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px' }}>
                        <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{stat.title}</div>
                            <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Class-wise Performance</h3>
                        <FiPieChart color="var(--primary-blue)" />
                    </div>
                    <div style={{ height: '280px' }}>
                        <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(0,0,0,0.03)' }, beginAtZero: true, max: 100 } } }} />
                    </div>
                </div>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Engagement Analytics</h3>
                        <FiActivity color="var(--primary-blue)" />
                    </div>
                    <div style={{ height: '280px' }}>
                        <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(0,0,0,0.03)' }, beginAtZero: true, max: 100 } } }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="card" style={{ padding: 0 }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Upcoming Lecture Sessions</h3>
                        <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>TODAY</div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Timing</th>
                                    <th>Class & Section</th>
                                    <th>Subject</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { time: '09:00 AM - 10:00 AM', cls: 'CSE - A (2nd Year)', sub: 'Data Structures', room: 'Lecture Hall 101' },
                                    { time: '10:15 AM - 11:15 AM', cls: 'CSE - B (2nd Year)', sub: 'Algorithms', room: 'Lecture Hall 102' },
                                    { time: '11:30 AM - 12:30 PM', cls: 'ECE - A (3rd Year)', sub: 'Microprocessors', room: 'Lab Complex 3' }
                                ].map((c, i) => (
                                    <tr key={i}>
                                        <td style={{ color: 'var(--primary-blue)', fontWeight: '700' }}>{c.time}</td>
                                        <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{c.cls}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{c.sub}</td>
                                        <td>
                                            <span style={{ background: 'var(--bg-primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>{c.room}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Faculty Activity Log</h3>
                        <FiCheckCircle color="var(--primary-blue)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                            { msg: 'Successfully marked attendance for CSE-A.', time: '10 mins ago', type: 'success' },
                            { msg: 'New leave request from John (STU105)', time: '1 hour ago', type: 'warning' },
                            { msg: 'Shared lecture notes for Algorithms.', time: '2 hours ago', type: 'info' }
                        ].map((act, i) => (
                            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: act.type === 'success' ? '#059669' : act.type === 'warning' ? '#d97706' : 'var(--primary-blue)', marginTop: '6px', flexShrink: 0 }} />
                                <div>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5', fontWeight: '500' }}>{act.msg}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--text-light)', fontWeight: '600' }}>{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                table { width: 100%; border-collapse: collapse; }
                th { background: var(--bg-primary); padding: 16px 24px; text-align: left; color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; border-bottom: 1px solid var(--glass-border); }
                td { padding: 16px 24px; border-bottom: 1px solid var(--glass-border); color: var(--text-secondary); font-size: 14px; vertical-align: middle; }
                tr:hover { background: rgba(37, 99, 235, 0.02); }
            `}</style>
        </div>
    );
};

export default DashboardHome;
