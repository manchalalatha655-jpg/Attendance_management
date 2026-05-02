import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiActivity, FiPieChart, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

const AttendanceMonitor = () => {
    const [analytics, setAnalytics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get('http://localhost:5000/api/admin/analytics/departments', config);
                setAnalytics(res.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchAnalytics();
    }, [user.token]);

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>Attendance Monitoring</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Real-time attendance analytics across all departments.</p>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>Loading Analytics...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                    {analytics.map(item => (
                        <div key={item.name} style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.name}</div>
                                <div style={{ 
                                    padding: '6px 12px', 
                                    borderRadius: '20px', 
                                    background: item.percentage >= 75 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: item.percentage >= 75 ? '#10b981' : '#ef4444',
                                    fontSize: '13px',
                                    fontWeight: '800'
                                }}>
                                    {item.percentage.toFixed(1)}%
                                </div>
                            </div>
                            
                            <div style={{ width: '100%', height: '12px', background: 'var(--bg-primary)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                                <div style={{ 
                                    width: `${item.percentage}%`, 
                                    height: '100%', 
                                    background: item.percentage >= 75 ? 'var(--blue-gradient)' : 'linear-gradient(90deg, #ef4444, #f87171)',
                                    borderRadius: '10px',
                                    transition: 'width 1s ease-in-out'
                                }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Status</div>
                                    <div style={{ fontWeight: '700', color: item.percentage >= 75 ? '#10b981' : '#ef4444' }}>
                                        {item.percentage >= 75 ? 'Optimal' : 'Needs Review'}
                                    </div>
                                </div>
                                <div style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Action</div>
                                    <div style={{ fontWeight: '700', color: 'var(--primary-blue)', fontSize: '13px', cursor: 'pointer' }}>View Details</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {analytics.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', background: 'var(--bg-secondary)', padding: '60px', borderRadius: '20px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
                            <FiActivity size={48} style={{ color: 'var(--text-light)', marginBottom: '16px' }} />
                            <h3 style={{ color: 'var(--text-primary)' }}>No attendance data found</h3>
                            <p style={{ color: 'var(--text-light)' }}>Start marking attendance in classes to see analytics here.</p>
                        </div>
                    )}
                </div>
            )}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default AttendanceMonitor;
