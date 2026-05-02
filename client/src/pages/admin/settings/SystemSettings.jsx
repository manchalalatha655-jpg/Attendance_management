import React from 'react';
import { FiSettings, FiDatabase, FiLock, FiGlobe, FiCpu } from 'react-icons/fi';

const SystemSettings = () => {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>System Settings</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Configure global application parameters and system defaults.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiGlobe style={{ color: 'var(--primary-blue)' }} /> General Configuration
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Institution Name</label>
                            <input type="text" defaultValue="Vemu Institute of Technology" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Academic Session</label>
                            <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--input-text)' }}>
                                <option>2025-2026</option>
                                <option>2026-2027</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Enable Auto-Alerts</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>Send emails to students with low attendance automatically.</div>
                            </div>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
                        </div>
                    </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FiDatabase style={{ color: 'var(--primary-blue)' }} /> System Health
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Database Connection</span>
                            <span style={{ color: '#10b981', fontWeight: '800' }}>ACTIVE</span>
                        </div>
                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Storage Usage</span>
                            <span>4.2 GB / 10 GB</span>
                        </div>
                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Last Backup</span>
                            <span>Today, 04:00 AM</span>
                        </div>
                        <button style={{ marginTop: '10px', padding: '12px', background: 'var(--bg-primary)', color: 'var(--primary-blue)', border: '1px solid var(--primary-blue)', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                            Run Diagnostic Check
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default SystemSettings;
