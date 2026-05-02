import React from 'react';
import { FiPieChart, FiTrendingUp, FiActivity, FiUsers, FiAward, FiArrowUpRight } from 'react-icons/fi';

const PerformanceAnalytics = () => {
    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Performance Analytics</h2>
                <p style={{ color: 'var(--text-light)' }}>Detailed insights into departmental attendance trends and academic performance.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                    { label: 'Avg Attendance', value: '82.5%', trend: '+2.4%', icon: <FiActivity />, color: 'var(--primary-blue)' },
                    { label: 'Top Faculty', value: 'Dr. Navyasree', trend: '100%', icon: <FiAward />, color: 'var(--accent-green)' },
                    { label: 'Shortage Rate', value: '4.2%', trend: '-1.2%', icon: <FiTrendingUp />, color: 'var(--accent-red)' },
                    { label: 'Active Sessions', value: '18', trend: 'Normal', icon: <FiUsers />, color: 'var(--primary-accent)' }
                ].map((card, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--bg-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color }}>
                                {card.icon}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: '800', color: card.trend.includes('+') ? 'var(--accent-green)' : card.trend.includes('-') ? 'var(--accent-red)' : 'var(--text-light)', background: 'rgba(255,255,255,0.4)', padding: '4px 8px', borderRadius: '6px', alignSelf: 'flex-start' }}>
                                {card.trend}
                            </span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: '700', marginBottom: '4px', textTransform: 'uppercase' }}>{card.label}</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary-accent)' }}>{card.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '24px', border: '1px solid var(--glass-border)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <FiTrendingUp size={48} color="var(--primary-blue)" style={{ opacity: 0.3, marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Attendance Trends</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Visual representation of attendance fluctuations across the semester will appear here.</p>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '24px', border: '1px solid var(--glass-border)', height: '400px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '20px' }}>Faculty Distribution</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { name: 'Dr. Navyasree', score: 98, color: 'var(--accent-green)' },
                            { name: 'Prof. राजेश', score: 85, color: 'var(--primary-blue)' },
                            { name: 'Dr. Robert', score: 92, color: 'var(--primary-accent)' },
                            { name: 'Ms. Latha', score: 78, color: 'var(--accent-red)' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                                    <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>{item.name}</span>
                                    <span style={{ fontWeight: '800', color: 'var(--primary-accent)' }}>{item.score}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: `${item.score}%`, height: '100%', background: item.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceAnalytics;
