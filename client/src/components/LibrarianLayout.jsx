import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiGrid, FiBook, FiUsers, FiClock, 
    FiSettings, FiLogOut, FiBell, FiUser, FiSun, FiMoon
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const LibrarianSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { title: 'Dashboard Overview', icon: <FiGrid />, path: '/librarian/dashboard' },
        { title: 'Manage Books', icon: <FiBook />, path: '/librarian/books' },
        { title: 'Student Access', icon: <FiUsers />, path: '/librarian/students' },
        { title: 'Issue/Return', icon: <FiClock />, path: '/librarian/issue' },
        { title: 'Settings', icon: <FiSettings />, path: '/librarian/settings' }
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
                    LIB
                </div>
                <div>
                    <h2 style={{ fontSize: '15px', margin: 0, fontWeight: '700', color: 'white', letterSpacing: '0.5px' }}>VEMU Institute</h2>
                    <p style={{ fontSize: '11px', margin: 0, color: 'var(--sidebar-text)', opacity: 0.8 }}>Library Portal</p>
                </div>
            </div>

            <div style={{ padding: '20px 0', flex: 1, overflowY: 'auto' }}>
                <p style={{ padding: '0 25px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', fontWeight: '700' }}>Library Operations</p>
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

const LibrarianHeader = () => {
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
                Librarian Dashboard | {user?.name || 'Academic Services'}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <button onClick={toggleTheme} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#f1c40f', width: '38px', height: '38px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {theme === 'light' ? <FiMoon /> : <FiSun />}
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{user?.name || 'Librarian'}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Institutional Librarian</div>
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

const LibrarianLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
            <LibrarianSidebar />
            <div style={{ flex: 1, marginLeft: 'var(--sidebar-width)', display: 'flex', flexDirection: 'column' }}>
                <LibrarianHeader />
                <div style={{ padding: '32px', flex: 1, overflowX: 'hidden' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LibrarianLayout;
