import React from 'react';
import { FiFileText, FiDownload, FiBarChart2, FiFilter } from 'react-icons/fi';

const AdminReports = () => {
    const reportTypes = [
        { id: 1, title: 'Master Attendance Report', desc: 'Consolidated attendance for all departments and classes.', icon: <FiFileText /> },
        { id: 2, title: 'Faculty Activity Log', desc: 'Tracking login, mark attendance, and report generation activity.', icon: <FiActivity /> },
        { id: 3, title: 'Monthly Shortage Alert', desc: 'List of students with attendance below 75% for the current month.', icon: <FiAlertCircle /> },
        { id: 4, title: 'Department Performance', desc: 'Comparative analysis of attendance trends across departments.', icon: <FiBarChart2 /> }
    ];

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '24px', fontWeight: '800' }}>Reports & Analytics</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '14px' }}>Generate and export comprehensive system reports.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {reportTypes.map(report => (
                    <div key={report.id} style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '20px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                            {report.icon}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>{report.title}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{report.desc}</p>
                        </div>
                        <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                            <button style={{ flex: 1, padding: '10px', background: 'var(--blue-gradient)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <FiDownload /> Export PDF
                            </button>
                            <button style={{ padding: '10px', background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)', borderRadius: '10px', cursor: 'pointer' }}>
                                <FiFilter />
                            </button>
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

const FiActivity = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const FiAlertCircle = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;

export default AdminReports;
