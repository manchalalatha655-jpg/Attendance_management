import React from 'react';
import { FiBookOpen, FiCheckSquare, FiAlertCircle, FiClock, FiCalendar, FiBell, FiActivity, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const StudentDashboardHome = () => {
    const { user } = useAuth();

    const stats = [
        { title: 'Aggregate Attendance', value: '85%', icon: <FiTrendingUp />, color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
        { title: 'Enrolled Subjects', value: '6', icon: <FiBookOpen />, color: 'var(--primary-blue)', bg: 'rgba(37, 99, 235, 0.1)' },
        { title: 'Total Sessions', value: '142', icon: <FiActivity />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
        { title: 'Sessions Missed', value: '25', icon: <FiAlertCircle />, color: 'var(--accent-red)', bg: 'rgba(239, 68, 68, 0.1)' },
        { title: 'Leave Requests', value: '2 Active', icon: <FiClock />, color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
        { title: 'Shortage Alerts', value: '1 Critical', icon: <FiAlertCircle />, color: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)' }
    ];

    const barData = {
        labels: ['Data Structures', 'OS', 'Algorithms', 'Networks', 'DBMS', 'Mathematics'],
        datasets: [{
            label: 'Attendance %',
            data: [90, 72, 85, 95, 88, 65],
            backgroundColor: ['#1e3a8a', '#d97706', '#2563eb', '#3b82f6', '#60a5fa', '#dc2626'],
            borderRadius: 8,
            barThickness: 30
        }]
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'My Participation Trend',
            data: [82, 85, 88, 80, 85],
            borderColor: 'var(--primary-blue)',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: 'white',
            pointBorderColor: 'var(--primary-blue)',
            pointBorderWidth: 2
        }]
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Welcome back, <span style={{ color: 'var(--primary-blue)' }}>{user?.name || 'Academic Scholar'}</span>!</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Analyze your academic engagement and upcoming schedule for the current semester.</p>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Attendance by Subject</h3>
                        <FiPieChart color="var(--primary-blue)" />
                    </div>
                    <div style={{ height: '280px' }}>
                        <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(0,0,0,0.03)' }, beginAtZero: true, max: 100 } } }} />
                    </div>
                </div>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Monthly Attendance Progress</h3>
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
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Current Day Timetable</h3>
                        <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}</div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Timing</th>
                                    <th>Subject</th>
                                    <th>Faculty Member</th>
                                    <th>Hall / Lab</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { time: '09:00 AM', sub: 'Data Structures', prof: 'Prof. Smith', room: 'Hall 101' },
                                    { time: '10:15 AM', sub: 'Algorithms', prof: 'Prof. Johnson', room: 'Hall 102' },
                                    { time: '11:30 AM', sub: 'Networks', prof: 'Prof. Davis', room: 'Lab Complex 3' }
                                ].map((c, i) => (
                                    <tr key={i}>
                                        <td style={{ color: 'var(--primary-blue)', fontWeight: '700' }}>{c.time}</td>
                                        <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{c.sub}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{c.prof}</td>
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
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Alerts & Notices</h3>
                        <FiBell color="var(--primary-blue)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { msg: 'Warning: Mathematics attendance is 65%. Needs improvement.', time: 'Today', type: 'danger' },
                            { msg: 'Algorithms class relocated to Room 204 today.', time: 'Yesterday', type: 'info' },
                            { msg: 'Leave request for Friday approved.', time: '2 days ago', type: 'success' }
                        ].map((act, i) => (
                            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px', background: act.type === 'danger' ? 'rgba(239, 68, 68, 0.05)' : act.type === 'success' ? 'rgba(5, 150, 105, 0.05)' : 'var(--bg-primary)', borderRadius: '12px', border: `1px solid ${act.type === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'var(--glass-border)'}` }}>
                                <div style={{ marginTop: '2px', color: act.type === 'success' ? '#059669' : act.type === 'danger' ? 'var(--accent-red)' : 'var(--primary-blue)' }}>
                                    {act.type === 'danger' ? <FiAlertCircle size={20} /> : <FiBell size={20} />}
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600', lineHeight: '1.4' }}>{act.msg}</p>
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

export default StudentDashboardHome;
