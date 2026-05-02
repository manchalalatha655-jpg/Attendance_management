import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiShield, FiUsers, FiLock, FiInfo } from 'react-icons/fi';

const ManageRoles = () => {
    const [stats, setStats] = useState({ admin: 0, hod: 0, teacher: 0, student: 0, librarian: 0 });
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get('http://localhost:5000/api/admin/users', config);
                const counts = res.data.reduce((acc, u) => {
                    acc[u.role] = (acc[u.role] || 0) + 1;
                    return acc;
                }, { admin: 0, hod: 0, teacher: 0, student: 0, librarian: 0 });
                setStats(counts);
            } catch (err) { console.error(err); }
        };
        fetchStats();
    }, [user.token]);

    const roles = [
        { id: 'admin', name: 'Super Admin', icon: <FiLock />, color: '#ef4444', desc: 'Full system access, manage all users, classes, and settings.' },
        { id: 'hod', name: 'Department Head', icon: <FiShield />, color: '#f59e0b', desc: 'Manage departmental faculty, students, and academic records.' },
        { id: 'teacher', name: 'Faculty Member', icon: <FiUsers />, color: '#3b82f6', desc: 'Mark attendance, manage assigned classes, and generate reports.' },
        { id: 'student', name: 'Student', icon: <FiUsers />, color: '#10b981', desc: 'View attendance, download reports, and receive notifications.' },
        { id: 'librarian', name: 'Librarian', icon: <FiBook />, color: '#8b5cf6', desc: 'Manage library inventory and track book issue/return.' }
    ];

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>User Roles & Permissions</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Overview of system roles and their assigned permissions.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {roles.map(role => (
                    <div key={role.id} style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '20px', boxShadow: 'var(--shadow)', borderTop: `5px solid ${role.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${role.color}15`, color: role.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                {role.icon}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>{stats[role.id]}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase' }}>Active Users</div>
                            </div>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>{role.name}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>{role.desc}</p>
                        
                        <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-light)' }}>
                            <FiInfo style={{ color: role.color }} /> Permissions are pre-configured for this role.
                        </div>
                    </div>
                ))}
            </div>
            
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

const FiBook = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
);

export default ManageRoles;
