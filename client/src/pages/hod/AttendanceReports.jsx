import React from 'react';
import { FiDownload, FiFilter, FiCalendar, FiFileText, FiBarChart2, FiUsers } from 'react-icons/fi';

const AttendanceReports = () => {
    const reports = [
        { id: 1, title: 'Monthly Department Summary', date: 'May 2024', type: 'PDF', size: '1.2 MB' },
        { id: 2, title: 'Shortage List - 2nd Year', date: 'May 15, 2024', type: 'XLSX', size: '450 KB' },
        { id: 3, title: 'Faculty Attendance Log', date: 'Weekly - May W2', type: 'PDF', size: '820 KB' },
        { id: 4, title: 'Consolidated Semester Report', date: 'Jan-May 2024', type: 'PDF', size: '4.5 MB' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Attendance Reports</h2>
                    <p style={{ color: 'var(--text-light)' }}>Generate and download comprehensive departmental attendance data.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--primary-accent)', fontWeight: '700' }}>
                        <FiFilter /> Filter Data
                    </button>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px' }}>
                        <FiFileText /> Generate New Report
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        { label: 'Overall Attendance', value: '84%', icon: <FiBarChart2 />, color: 'var(--primary-blue)' },
                        { label: 'Active Students', value: '1,240', icon: <FiUsers />, color: 'var(--accent-green)' },
                        { label: 'Shortage Alerts', value: '28', icon: <FiFileText />, color: 'var(--accent-red)' }
                    ].map((stat, i) => (
                        <div key={i} style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ color: stat.color }}>{stat.icon}</div>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-accent)' }}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                {/* Report Table */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(14, 47, 118, 0.03)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-accent)' }}>Recent Documents</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--primary-accent)' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '12px' }}>REPORT TITLE</th>
                                <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '12px' }}>DATE RANGE</th>
                                <th style={{ padding: '16px 24px', textAlign: 'left', color: 'white', fontSize: '12px' }}>FORMAT</th>
                                <th style={{ padding: '16px 24px', textAlign: 'center', color: 'white', fontSize: '12px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '18px 24px' }}>
                                        <div style={{ fontWeight: '700', color: 'var(--primary-accent)' }}>{report.title}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{report.size}</div>
                                    </td>
                                    <td style={{ padding: '18px 24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FiCalendar size={14} /> {report.date}
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 24px' }}>
                                        <span style={{ 
                                            padding: '4px 10px', 
                                            borderRadius: '6px', 
                                            fontSize: '11px', 
                                            fontWeight: '800', 
                                            background: report.type === 'PDF' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            color: report.type === 'PDF' ? 'var(--accent-red)' : 'var(--accent-green)'
                                        }}>{report.type}</span>
                                    </td>
                                    <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                                        <button style={{ background: 'var(--bg-primary)', border: 'none', padding: '8px 16px', borderRadius: '10px', color: 'var(--primary-accent)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}>
                                            <FiDownload size={14} /> Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceReports;
