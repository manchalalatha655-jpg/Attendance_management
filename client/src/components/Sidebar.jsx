import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiGrid, FiUsers, FiUserCheck, FiBook, FiMonitor, FiCalendar,
    FiClock, FiPieChart, FiShield, FiBell, FiSettings,
    FiUser, FiChevronDown, FiChevronRight, FiDatabase, FiAlertTriangle
} from 'react-icons/fi';

const Sidebar = () => {
    const location = useLocation();
    const [openSections, setOpenSections] = useState({ people: true, academic: true, monitoring: true, admin: true });

    const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    const linkStyle = (path) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px 12px 28px',
        textDecoration: 'none',
        color: isActive(path) ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
        fontSize: '13.5px',
        fontWeight: isActive(path) ? '700' : '500',
        borderLeft: isActive(path) ? '4px solid var(--primary-blue)' : '4px solid transparent',
        background: isActive(path) ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
        transition: 'all 0.3s',
        gap: '12px',
        marginBottom: '2px'
    });

    const sectionHeader = (label, icon, key) => (
        <div onClick={() => toggleSection(key)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px', cursor: 'pointer',
            fontSize: '11px', fontWeight: '800', color: 'var(--text-light)',
            textTransform: 'uppercase', letterSpacing: '1px', marginTop: '12px',
            userSelect: 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px', opacity: 0.8 }}>{icon}</span>
                {label}
            </div>
            {openSections[key] ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
        </div>
    );

    return (
        <div style={{
            width: 'var(--sidebar-width)',
            height: 'calc(100vh - 70px)',
            background: 'var(--sidebar-bg)',
            borderRight: '1px solid var(--sidebar-border)',
            padding: '10px 0',
            position: 'fixed',
            left: 0, top: '70px',
            overflowY: 'auto',
            zIndex: 900,
            boxShadow: '2px 0 10px rgba(0,0,0,0.02)'
        }}>
            {/* Dashboard Overview */}
            <Link to="/admin" style={{
                display: 'flex', alignItems: 'center',
                padding: '14px 20px', textDecoration: 'none',
                color: location.pathname === '/admin' ? 'var(--primary-blue)' : 'var(--text-primary)',
                fontSize: '14px', fontWeight: location.pathname === '/admin' ? '800' : '600',
                borderLeft: location.pathname === '/admin' ? '4px solid var(--primary-blue)' : '4px solid transparent',
                background: location.pathname === '/admin' ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                transition: 'all 0.3s', gap: '12px', marginBottom: '8px'
            }}>
                <FiGrid size={18} /> Dashboard Overview
            </Link>

            {/* PEOPLE MANAGEMENT */}
            {sectionHeader('People Management', <FiUsers />, 'people')}
            {openSections.people && (
                <>
                    <Link to="/admin/hods" style={linkStyle('/admin/hods')}><FiUserCheck size={16} />Manage HODs</Link>
                    <Link to="/admin/teachers/view" style={linkStyle('/admin/teachers/view')}><FiUserCheck size={16} />Manage Faculty</Link>
                    <Link to="/admin/students" style={linkStyle('/admin/students')}><FiUsers size={16} />Manage Students</Link>
                    <Link to="/admin/roles" style={linkStyle('/admin/roles')}><FiShield size={16} />Roles & Permissions</Link>
                </>
            )}

            {/* ACADEMIC STRUCTURE */}
            {sectionHeader('Academic Structure', <FiBook />, 'academic')}
            {openSections.academic && (
                <>
                    <Link to="/admin/departments" style={linkStyle('/admin/departments')}><FiDatabase size={16} />Departments</Link>
                    <Link to="/admin/classes/view" style={linkStyle('/admin/classes/view')}><FiMonitor size={16} />Classes & Sections</Link>
                    <Link to="/admin/classes/add" style={linkStyle('/admin/classes/add')}><FiMonitor size={16} />Add Class</Link>
                    <Link to="/admin/classes/assign-subjects" style={linkStyle('/admin/classes/assign-subjects')}><FiBook size={16} />Subjects Management</Link>
                    <Link to="/admin/classes/assign-teacher" style={linkStyle('/admin/classes/assign-teacher')}><FiUserCheck size={16} />Assign Faculty</Link>
                    <Link to="/admin/classes/allocation" style={linkStyle('/admin/classes/allocation')}><FiUsers size={16} />Student Allocation</Link>
                    <Link to="/admin/classes/timetable" style={linkStyle('/admin/classes/timetable')}><FiCalendar size={16} />Timetable</Link>
                </>
            )}

            {/* MONITORING */}
            {sectionHeader('Monitoring', <FiPieChart />, 'monitoring')}
            {openSections.monitoring && (
                <>
                    <Link to="/admin/attendance" style={linkStyle('/admin/attendance')}><FiAlertTriangle size={16} />Attendance Monitor</Link>
                    <Link to="/admin/leave" style={linkStyle('/admin/leave')}><FiClock size={16} />Leave Management</Link>
                    <Link to="/admin/reports" style={linkStyle('/admin/reports')}><FiPieChart size={16} />Reports & Analytics</Link>
                </>
            )}

            {/* ADMINISTRATION */}
            {sectionHeader('Administration', <FiSettings />, 'admin')}
            {openSections.admin && (
                <>
                    <Link to="/admin/notifications" style={linkStyle('/admin/notifications')}><FiBell size={16} />Notifications Center</Link>
                    <Link to="/admin/sessions" style={linkStyle('/admin/sessions')}><FiCalendar size={16} />Session & Term</Link>
                    <Link to="/admin/settings" style={linkStyle('/admin/settings')}><FiSettings size={16} />System Settings</Link>
                    <Link to="/admin/profile" style={linkStyle('/admin/profile')}><FiUser size={16} />Profile Settings</Link>
                </>
            )}

            <div style={{ marginTop: '30px', padding: '24px 20px', borderTop: '1px solid var(--glass-border)', fontSize: '11px', color: 'var(--text-light)', textAlign: 'center', background: 'var(--bg-primary)' }}>
                VEMU AMS &copy; {new Date().getFullYear()}<br/>
                <span style={{fontWeight: '700'}}>PROFESSIONAL EDITION</span>
            </div>
        </div>
    );
};

export default Sidebar;
