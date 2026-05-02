import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    FiUsers, FiUserCheck, FiMonitor, FiCalendar, FiAlertTriangle,
    FiClock, FiCheckCircle, FiActivity, FiBarChart2, FiDatabase,
    FiPlus, FiTrash2, FiEdit2, FiSearch, FiDownload, FiBell
} from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import AddUserModal from '../components/AddUserModal';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [deptStats, setDeptStats] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roleFilter, setRoleFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const { user } = useAuth();
    const usersPerPage = 8;

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [statsRes, deptRes, usersRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/stats', config),
                axios.get('http://localhost:5000/api/admin/analytics/departments', config),
                axios.get('http://localhost:5000/api/admin/users', config)
            ]);
            setStats(statsRes.data);
            setDeptStats(deptRes.data);
            setUsers(usersRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchData(); }, [user.token]);

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchData();
            } catch (err) { alert('Error deleting user'); }
        }
    };

    const handleEditUser = (userToEdit) => {
        setEditUser(userToEdit);
        setIsModalOpen(true);
    };

    const handleOpenModal = () => {
        setEditUser(null);
        setIsModalOpen(true);
    };

    const totalStudents = users.filter(u => u.role === 'student').length || stats?.totalStudents || 0;
    const totalTeachers = users.filter(u => u.role === 'teacher').length || stats?.totalTeachers || 0;
    const totalHODs = users.filter(u => u.role === 'hod').length;
    const totalAdmins = users.filter(u => u.role === 'admin').length;

    const statCards = [
        { title: 'Total Departments', value: stats?.totalDepartments || 4, icon: <FiDatabase />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', sub: 'CSE, ECE, MECH, CIVIL' },
        { title: 'Total HODs', value: totalHODs || 4, icon: <FiUserCheck />, color: '#2563eb', bg: 'rgba(37, 99, 235, 0.15)', sub: '4 Departments Active' },
        { title: 'Total Faculty', value: totalTeachers, icon: <FiUsers />, color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.15)', sub: 'Across all departments' },
        { title: 'Total Students', value: totalStudents, icon: <FiUsers />, color: '#1d4ed8', bg: 'rgba(29, 78, 216, 0.15)', sub: 'Enrolled this semester' },
        { title: 'Total Classes', value: stats?.totalClasses || 12, icon: <FiMonitor />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', sub: 'Active sections' },
        { title: "Today's Attendance", value: '88%', icon: <FiCheckCircle />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', sub: 'College-wide average' },
        { title: 'Pending Leaves', value: '17', icon: <FiClock />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', sub: 'Awaiting approval' },
        { title: 'Shortage Alerts', value: '28', icon: <FiAlertTriangle />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', sub: 'Below 75% threshold' },
    ];

    const barData = {
        labels: deptStats.length > 0 ? deptStats.map(d => d.name) : ['CSE', 'ECE', 'MECH', 'CIVIL'],
        datasets: [{
            label: 'Attendance %',
            data: deptStats.length > 0 ? deptStats.map(d => d.percentage?.toFixed(1)) : [88, 82, 76, 91],
            backgroundColor: ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa'],
            borderRadius: 6, borderWidth: 0
        }]
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'College Attendance',
            data: [84, 87, 82, 90, 88, 85],
            borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.08)',
            tension: 0.4, fill: true
        }]
    };

    const doughnutData = {
        labels: ['Admin', 'HOD', 'Faculty', 'Students'],
        datasets: [{
            data: [totalAdmins || 1, totalHODs || 4, totalTeachers, totalStudents],
            backgroundColor: ['#0f172a', '#1e3a8a', '#2563eb', '#60a5fa'],
            borderWidth: 0
        }]
    };

    const filteredUsers = users.filter(u => {
        const matchSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRole = roleFilter === 'all' || u.role === roleFilter;
        return matchSearch && matchRole;
    });
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const roleColors = { admin: '#ef4444', hod: '#2563eb', teacher: '#059669', student: '#d97706' };

    const activityLog = [
        { msg: 'New student registered: Alice Smith', time: '5 min ago', type: 'success' },
        { msg: 'HOD CSE approved leave request', time: '15 min ago', type: 'info' },
        { msg: 'Low attendance alert: 28 students below 75%', time: '1 hour ago', type: 'warning' },
        { msg: 'Faculty t101@vemu.org marked attendance for CSE-A', time: '2 hours ago', type: 'success' },
        { msg: 'System backup completed successfully', time: '3 hours ago', type: 'info' },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--blue-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>🎓</div>
                        <h1 style={{ fontSize: '26px', color: 'var(--text-primary)', fontWeight: '900', margin: 0, letterSpacing: '-1px' }}>VEMU AMS <span style={{ color: 'var(--primary-blue)' }}>Vemu Institute</span></h1>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', marginLeft: '52px' }}>Admin Dashboard</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ padding: '10px 18px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '600' }}>
                        <FiDownload size={16} /> Export
                    </button>
                    <button onClick={handleOpenModal} className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                        <FiPlus size={16} /> Add User
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {statCards.map((card, i) => (
                    <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: `5px solid ${card.color}` }}>
                        <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                            {card.icon}
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{card.title}</p>
                            <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Departmental Attendance</h3>
                        <FiBarChart2 color="var(--primary-blue)" size={20} />
                    </div>
                    <div style={{ height: '240px' }}>
                        <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(0,0,0,0.03)' }, beginAtZero: true, max: 100 } } }} />
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Trends</h3>
                        <FiActivity color="var(--primary-blue)" size={20} />
                    </div>
                    <div style={{ height: '240px' }}>
                        <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }} />
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>Users</h3>
                    </div>
                    <div style={{ height: '200px' }}>
                        <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11, weight: '600' } } } } }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div className="card" style={{ padding: '0' }}>
                    <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>User Management</h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontSize: '13px' }}>
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="hod">HOD</option>
                                <option value="teacher">Faculty</option>
                                <option value="student">Student</option>
                            </select>
                            <div style={{ position: 'relative' }}>
                                <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input type="text" placeholder="Quick search..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ padding: '8px 12px 8px 36px', borderRadius: '8px', width: '220px' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    {['Name', 'Email', 'Role', 'Department', 'Actions'].map(h => (
                                        <th key={h}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 ? currentUsers.map((u) => (
                                    <tr key={u._id}>
                                        <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', background: `${roleColors[u.role]}15`, color: roleColors[u.role], textTransform: 'uppercase' }}>{u.role}</span>
                                        </td>
                                        <td>{u.department?.name || u.department || 'General'}</td>
                                        <td style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => handleEditUser(u)} style={{ background: 'var(--bg-primary)', color: 'var(--primary-blue)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><FiEdit2 size={14} /></button>
                                            {u.role !== 'admin' && (
                                                <button onClick={() => handleDeleteUser(u._id)} style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--accent-red)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><FiTrash2 size={14} /></button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No matching records found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Showing {indexOfFirst + 1}–{Math.min(indexOfLast, filteredUsers.length)} of {filteredUsers.length}</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>Previous</button>
                            <button disabled={currentPage >= totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>Next</button>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ height: 'fit-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>System Events</h3>
                        <FiBell color="var(--primary-blue)" size={20} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {activityLog.map((act, i) => (
                            <div key={i} style={{ display: 'flex', gap: '14px', paddingBottom: '16px', borderBottom: i < activityLog.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: act.type === 'success' ? 'var(--accent-green)' : 'var(--primary-blue)', marginTop: '6px', flexShrink: 0 }} />
                                <div>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5', fontWeight: '500' }}>{act.msg}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--text-light)' }}>{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                        <p style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '12px', textTransform: 'uppercase' }}>Server Status</p>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            {['API Gateway: Online', 'Database: Connected', 'Auth Service: Active'].map((s, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} />
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUserAdded={fetchData} token={user.token} editUser={editUser} />
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                table { width: 100%; border-collapse: collapse; }
                th { background: var(--bg-primary); padding: 16px; text-align: left; color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
                td { padding: 16px; border-bottom: 1px solid var(--glass-border); color: var(--text-secondary); font-size: 14px; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
