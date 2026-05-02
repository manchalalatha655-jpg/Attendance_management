import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiGrid, FiUsers, FiCheckSquare, FiBookOpen, 
    FiCalendar, FiClock, FiPieChart, FiAlertTriangle, 
    FiFolderPlus, FiSettings, FiBell, FiLogOut, FiUser, FiSun, FiMoon
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const TeacherSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { title: 'Dashboard Overview', icon: <FiGrid />, path: '/teacher/dashboard' },
        { title: 'My Classes', icon: <FiUsers />, path: '/teacher/classes' },
        { title: 'Mark Attendance', icon: <FiCheckSquare />, path: '/teacher/mark-attendance' },
        { title: 'Student Records', icon: <FiBookOpen />, path: '/teacher/records' },
        { title: 'Timetable', icon: <FiCalendar />, path: '/teacher/timetable' },
        { title: 'Leave Management', icon: <FiClock />, path: '/teacher/leave' },
        { title: 'Performance Reports', icon: <FiPieChart />, path: '/teacher/reports' },
        { title: 'Shortage Alerts', icon: <FiAlertTriangle />, path: '/teacher/alerts' },
        { title: 'Study Materials', icon: <FiFolderPlus />, path: '/teacher/materials' },
        { title: 'Profile Settings', icon: <FiSettings />, path: '/teacher/settings' }
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
                    fontWeight: '800'
                }}>
                    <FiBookOpen size={20} />
                </div>
                <div>
                    <h2 style={{ fontSize: '15px', margin: 0, fontWeight: '700', color: 'white', letterSpacing: '0.5px' }}>VEMU Institute</h2>
                    <p style={{ fontSize: '11px', margin: 0, color: 'var(--sidebar-text)', opacity: 0.8 }}>Faculty Portal</p>
                </div>
            </div>

            <div style={{ padding: '20px 0', flex: 1, overflowY: 'auto' }}>
                <p style={{ padding: '0 25px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', fontWeight: '700' }}>Main Menu</p>
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
        </div>
    );
};

const TeacherHeader = () => {
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    
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
            <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '700', color: 'white' }}>
                Welcome, {user?.name || 'Faculty Member'}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <button onClick={toggleTheme} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#f1c40f', width: '38px', height: '38px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {theme === 'light' ? <FiMoon /> : <FiSun />}
                </button>
                
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <FiBell style={{ fontSize: '20px', color: '#94a3b8' }} />
                    <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--accent-red)', color: 'white', fontSize: '10px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: '800' }}>2</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{user?.name || 'Prof. Faculty'}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Academic Faculty</div>
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

const TeacherLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
            <TeacherSidebar />
            <div style={{ flex: 1, marginLeft: 'var(--sidebar-width)', display: 'flex', flexDirection: 'column' }}>
                <TeacherHeader />
                <div style={{ padding: '32px', flex: 1, overflowX: 'hidden' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TeacherLayout;
