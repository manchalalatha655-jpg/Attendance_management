import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser, FiBarChart2, FiBell, FiSun, FiMoon } from 'react-icons/fi';
import axios from 'axios';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        if (user) {
            const fetchNotifications = async () => {
                try {
                    const { data } = await axios.get('http://localhost:5000/api/notifications', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    setNotifications(data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchNotifications();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'var(--bg-dark-navy)',
            padding: '0 30px',
            height: '70px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            color: 'white',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        background: 'var(--blue-gradient)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
                    }}>
                        🎓
                    </div>
                    <div>
                        <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '0.5px', margin: 0 }}>
                            VEMU AMS <span style={{ color: 'var(--primary-blue)', fontSize: '14px' }}>Vemu Institute</span>
                        </h2>
                        <p style={{ fontSize: '10px', margin: 0, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>{user.role} Portal</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                    <div 
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ position: 'relative', cursor: 'pointer', padding: '8px', borderRadius: '8px', background: showNotifications ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                    >
                        <FiBell style={{ fontSize: '20px', opacity: 0.8 }} />
                        {notifications.length > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                background: 'var(--accent-red)',
                                color: 'white',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                fontSize: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                border: '2px solid var(--bg-dark-navy)'
                            }}>
                                {notifications.length}
                            </span>
                        )}
                    </div>

                    {showNotifications && (
                        <div style={{
                            position: 'absolute',
                            top: '50px',
                            right: '0',
                            width: '320px',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--glass-border)',
                            zIndex: 2000,
                            overflow: 'hidden',
                            color: 'var(--text-primary)'
                        }}>
                            <div style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)', background: 'var(--bg-primary)', fontWeight: '800', fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                                Notifications
                                <span style={{ color: 'var(--primary-blue)', fontSize: '12px' }}>{notifications.length} New</span>
                            </div>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {notifications.length > 0 ? notifications.map((n, i) => (
                                    <div key={i} style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                        <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>{n.title || 'System Alert'}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{n.message}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '8px' }}>{new Date(n.createdAt).toLocaleString()}</div>
                                    </div>
                                )) : (
                                    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-light)', fontSize: '13px' }}>
                                        No new notifications
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', fontSize: '12px', fontWeight: '700', color: 'var(--primary-blue)', cursor: 'pointer' }}>
                                View All Notifications
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: theme === 'dark' ? '#f1c40f' : 'white',
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        transition: 'all 0.3s'
                    }}
                >
                    {theme === 'light' ? <FiMoon /> : <FiSun />}
                </button>

                <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{user.name}</div>
                        <div style={{ fontSize: '11px', opacity: 0.6 }}>Super Administrator</div>
                    </div>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'var(--blue-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '22px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
                    }} onClick={() => navigate('/profile')}>
                        <FiUser />
                    </div>
                </div>

                <button onClick={handleLogout} style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ff7675',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                }}>
                    <FiLogOut /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
