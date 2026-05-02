import React from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiUsers, FiUserCheck, FiBookOpen, FiActivity, FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiClock, FiShield, FiPieChart } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const DashboardHome = () => {
    const { user } = useAuth();
    const [counts, setCounts] = React.useState({ faculty: 0, students: 0, classes: 0 });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const deptUsers = res.data.filter(u => u.department === user.department);
                const facultyCount = deptUsers.filter(u => u.role === 'teacher').length;
                const studentCount = deptUsers.filter(u => u.role === 'student').length;
                
                setCounts({ faculty: facultyCount, students: studentCount, classes: facultyCount * 2 });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchCounts();
    }, [user]);

    const stats = [
        { title: 'Total Faculty', value: counts.faculty, icon: <FiUserCheck />, color: 'var(--primary-blue)', bg: 'rgba(37, 99, 235, 0.1)' },
        { title: 'Total Students', value: counts.students, icon: <FiUsers />, color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
        { title: 'Total Classes', value: counts.classes, icon: <FiBookOpen />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
        { title: "Today's Avg.", value: '88%', icon: <FiTrendingUp />, color: '#0891b2', bg: 'rgba(8, 145, 178, 0.1)' },
        { title: 'Pending Leave', value: '12', icon: <FiClock />, color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
        { title: 'Defaulters', value: '28', icon: <FiAlertTriangle />, color: 'var(--accent-red)', bg: 'rgba(239, 68, 68, 0.1)' }
    ];

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '100px' }}>
            <div className="animate-spin" style={{ width: '50px', height: '50px', border: '5px solid var(--bg-primary)', borderTopColor: 'var(--primary-blue)', borderRadius: '50%', margin: '0 auto 20px' }}></div>
            <p style={{ color: 'var(--text-light)', fontWeight: '600' }}>Synchronizing Departmental Data...</p>
        </div>
    );

    const barData = {
        labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
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
            label: 'Department Trend',
            data: [85, 88, 86, 90, 84, 89],
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
                <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Departmental Overview</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Real-time performance metrics and institutional analytics.</p>
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
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Year-wise Performance</h3>
                        <FiPieChart color="var(--primary-blue)" />
                    </div>
                    <div style={{ height: '280px' }}>
                        <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(0,0,0,0.03)' }, beginAtZero: true, max: 100 } } }} />
                    </div>
                </div>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Weekly Attendance Trend</h3>
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
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Critical Defaulters (Below 75%)</h3>
                        <button style={{ background: 'rgba(37, 99, 235, 0.1)', border: 'none', color: 'var(--primary-blue)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>Monitor All</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Roll No</th>
                                    <th>Year</th>
                                    <th>Attendance Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'John Doe', roll: 'STU105', year: '2nd Year', att: '62%' },
                                    { name: 'Emma Wilson', roll: 'STU210', year: '3rd Year', att: '58%' },
                                    { name: 'Michael Brown', roll: 'STU055', year: '1st Year', att: '64%' }
                                ].map((s, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{s.name}</td>
                                        <td>{s.roll}</td>
                                        <td>{s.year}</td>
                                        <td>
                                            <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{s.att} CRITICAL</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>System Log</h3>
                        <FiShield color="var(--primary-blue)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                            { msg: 'Prof. Smith submitted 3rd Year attendance.', time: '10 mins ago', type: 'success' },
                            { msg: 'Leave request from Jane (STU401)', time: '1 hour ago', type: 'warning' },
                            { msg: 'System integrity check passed.', time: '2 hours ago', type: 'info' }
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
