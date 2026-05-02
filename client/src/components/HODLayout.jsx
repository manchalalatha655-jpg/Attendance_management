import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiGrid, FiUsers, FiUserCheck, FiBookOpen, 
    FiFileText, FiClock, FiCalendar, FiPieChart, 
    FiSettings, FiLogOut, FiBell, FiUser, FiSun, FiMoon
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const HODSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { title: 'Dashboard Overview', icon: <FiGrid />, path: '/hod/dashboard' },
        { title: 'Manage Faculty', icon: <FiUserCheck />, path: '/hod/faculty' },
        { title: 'Manage Students', icon: <FiUsers />, path: '/hod/students' },
        { title: 'Department Classes', icon: <FiBookOpen />, path: '/hod/classes' },
        { title: 'Attendance Reports', icon: <FiFileText />, path: '/hod/reports' },
        { title: 'Leave Requests', icon: <FiClock />, path: '/hod/leave' },
        { title: 'Timetable Management', icon: <FiCalendar />, path: '/hod/timetable' },
        { title: 'Performance Analytics', icon: <FiPieChart />, path: '/hod/analytics' },
        { title: 'Profile Settings', icon: <FiSettings />, path: '/hod/settings' }
    ];

    return (
        <div style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            background: 'var(--sidebar-bg)',
            color: 'white',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            boxShadow: '4px 0 15px rgba(0,0,0,0.2)',
            borderRight: '1px solid var(--sidebar-border)'
        }}>
            <div style={{
                padding: '24px',
                borderBottom: '1px solid var(--sidebar-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--blue-gradient)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '800',
                    fontSize: '16px'
                }}>
                    HD
                </div>
                <div>
                    <h2 style={{ fontSize: '15px', margin: 0, fontWeight: '700', color: 'white', letterSpacing: '0.5px' }}>VEMU Institute</h2>
                    <p style={{ fontSize: '11px', margin: 0, color: 'var(--sidebar-text)', opacity: 0.8 }}>HOD Portal</p>
                </div>
            </div>

            <div style={{ padding: '20px 0', flex: 1, overflowY: 'auto' }}>
                <p style={{ padding: '0 25px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', fontWeight: '700' }}>Navigation</p>
                {menuItems.map((item, index) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link key={index} to={item.path} style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '14px 25px',
                            textDecoration: 'none',
                            color: isActive ? 'white' : 'var(--sidebar-text)',
                            background: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                            borderLeft: isActive ? '4px solid var(--primary-blue)' : '4px solid transparent',
                            transition: 'all 0.3s ease',
                            fontSize: '14px',
                            marginBottom: '4px'
                        }}>
                            <span style={{ marginRight: '16px', fontSize: '18px', color: isActive ? 'var(--primary-blue)' : 'inherit' }}>{item.icon}</span>
                            <span style={{ fontWeight: isActive ? '600' : '400' }}>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
            
            <div style={{ padding: '20px', borderTop: '1px solid var(--sidebar-border)' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: 'var(--sidebar-text)' }}>Academic Session</p>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>2023 - 2024</p>
                </div>
            </div>
        </div>
    );
};

const HODHeader = () => {
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [notifications] = React.useState([
        { id: 1, title: 'Attendance Alert', message: 'CSE 2nd Year attendance is below 75%.', time: '5m ago' },
        { id: 2, title: 'Leave Request', message: 'Prof. John has requested leave for tomorrow.', time: '2h ago' }
    ]);
    
    return (
        <div style={{
            height: '70px',
            background: 'var(--bg-dark-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 900
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.2)', padding: '6px 12px', borderRadius: '6px', color: '#60a5fa', fontSize: '12px', fontWeight: '700' }}>
                    {user?.department || 'COMPUTER SCIENCE'}
                </div>
                <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '700', color: 'white' }}>
                    Departmental Dashboard
                </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <button onClick={toggleTheme} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#f1c40f', width: '38px', height: '38px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {theme === 'light' ? <FiMoon /> : <FiSun />}
                </button>
                
                <div style={{ position: 'relative' }}>
                    <div 
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ position: 'relative', cursor: 'pointer', color: '#94a3b8', padding: '8px' }}
                    >
                        <FiBell style={{ fontSize: '20px' }} />
                        <span style={{ position: 'absolute', top: '2px', right: '2px', background: 'var(--accent-red)', color: 'white', fontSize: '10px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: '800', border: '2px solid var(--bg-dark-navy)' }}>{notifications.length}</span>
                    </div>

                    {showNotifications && (
                        <div style={{
                            position: 'absolute', top: '50px', right: '0', width: '300px',
                            background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--glass-border)', zIndex: 1000, overflow: 'hidden'
                        }}>
                            <div style={{ padding: '15px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--glass-border)', fontWeight: '800', color: 'var(--text-primary)', fontSize: '13px' }}>
                                Department Notifications
                            </div>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {notifications.map(n => (
                                    <div key={n.id} style={{ padding: '15px', borderBottom: '1px solid var(--glass-border)', cursor: 'pointer' }}>
                                        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{n.title}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{n.message}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '6px' }}>{n.time}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '10px', textAlign: 'center', fontSize: '12px', color: 'var(--primary-blue)', fontWeight: '700', cursor: 'pointer' }}>
                                View All
                            </div>
                        </div>
                    )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{user?.name || 'HOD Name'}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Head of Department</div>
                    </div>
                    <div style={{ width: '42px', height: '42px', background: 'var(--blue-gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <FiUser size={22} />
                    </div>
                    <button onClick={logout} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Logout">
                        <FiLogOut size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const HODLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
            <HODSidebar />
            <div style={{ flex: 1, marginLeft: 'var(--sidebar-width)', display: 'flex', flexDirection: 'column' }}>
                <HODHeader />
                <div style={{ padding: '32px', flex: 1, overflowX: 'hidden' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HODLayout;
