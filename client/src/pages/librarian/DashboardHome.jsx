import React from 'react';
import { FiBook, FiUsers, FiClock, FiActivity, FiArrowRight, FiBookOpen, FiBookmark, FiSearch } from 'react-icons/fi';

const StatCard = ({ icon, label, value, color, bg }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px' }}>
        <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>{label}</p>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0 }}>{value}</h3>
        </div>
    </div>
);

const DashboardHome = () => {
    const stats = [
        { icon: <FiBook />, label: 'Inventory Size', value: '12,450', color: 'var(--primary-blue)', bg: 'rgba(37, 99, 235, 0.1)' },
        { icon: <FiUsers />, label: 'Active Readers', value: '842', color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
        { icon: <FiClock />, label: 'Overdue Books', value: '15', color: 'var(--accent-red)', bg: 'rgba(239, 68, 68, 0.1)' },
        { icon: <FiActivity />, label: 'Daily Circulation', value: '128', color: '#0891b2', bg: 'rgba(8, 145, 178, 0.1)' }
    ];

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Library Resource Center</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Efficiently manage book inventory, student circulation, and institutional resources.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="card" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: '800' }}>Live Circulation Stream</h3>
                        <div style={{ background: 'var(--bg-primary)', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', color: 'var(--primary-blue)', fontWeight: '700' }}>REAL-TIME</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
                        <div style={{ width: '80px', height: '80px', background: 'var(--bg-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)', marginBottom: '24px', opacity: 0.6 }}>
                            <FiBookOpen size={40} />
                        </div>
                        <h4 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>No Active Records</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '300px' }}>Current circulation stream is empty. Start by issuing a new resource to a student.</p>
                        <button className="btn-primary" style={{ marginTop: '24px', padding: '10px 20px', fontSize: '14px' }}>
                            Initialize First Issue
                        </button>
                    </div>
                </div>

                <div className="card" style={{ height: 'fit-content' }}>
                    <h3 style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Librarian Toolbox</h3>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        {[
                            { label: 'Circulation Management', icon: <FiActivity />, desc: 'Issue or return resources' },
                            { label: 'Inventory Registry', icon: <FiBookmark />, desc: 'Manage book metadata' },
                            { label: 'Member Verification', icon: <FiUsers />, desc: 'Verify student library ID' },
                            { label: 'Resource Search', icon: <FiSearch />, desc: 'Deep-search the repository' }
                        ].map((action, i) => (
                            <button key={i} style={{ 
                                padding: '16px', 
                                background: 'var(--bg-primary)', 
                                border: '1px solid var(--glass-border)', 
                                borderRadius: '12px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '16px', 
                                cursor: 'pointer', 
                                transition: 'all 0.3s ease',
                                textAlign: 'left',
                                position: 'relative'
                            }}>
                                <div style={{ color: 'var(--primary-blue)', fontSize: '18px' }}>{action.icon}</div>
                                <div>
                                    <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '700' }}>{action.label}</div>
                                    <div style={{ color: 'var(--text-light)', fontSize: '11px', fontWeight: '600' }}>{action.desc}</div>
                                </div>
                                <FiArrowRight style={{ marginLeft: 'auto', opacity: 0.3 }} />
                            </button>
                        ))}
                    </div>
                    
                    <div style={{ marginTop: '24px', padding: '20px', background: 'var(--blue-gradient)', borderRadius: '16px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '800' }}>Resource Alerts</h4>
                            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9, lineHeight: 1.5 }}>You have 15 books currently overdue. System notices have been dispatched.</p>
                        </div>
                        <FiClock style={{ position: 'absolute', right: '-10px', bottom: '-10px', fontSize: '80px', opacity: 0.1 }} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                button:hover { transform: translateX(5px); border-color: var(--primary-blue); }
            `}</style>
        </div>
    );
};

export default DashboardHome;
