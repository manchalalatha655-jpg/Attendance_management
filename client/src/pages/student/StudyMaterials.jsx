import React from 'react';
import { FiFileText, FiDownload, FiSearch, FiFolder, FiStar } from 'react-icons/fi';

const StudyMaterials = () => {
    const materials = [
        { id: 1, title: 'Introduction to Data Structures', subject: 'Data Structures', instructor: 'Prof. Navyasree', type: 'PDF', date: '2024-05-01' },
        { id: 2, title: 'Java Exception Handling Notes', subject: 'Java Programming', instructor: 'Dr. Smith', type: 'DOCX', date: '2024-05-05' },
        { id: 3, title: 'DBMS Normalization PPT', subject: 'DBMS', instructor: 'Dr. Robert', type: 'PPTX', date: '2024-05-12' },
        { id: 4, title: 'Memory Management Guide', subject: 'Operating Systems', instructor: 'Prof. Latha', type: 'PDF', date: '2024-05-15' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Study Materials</h2>
                    <p style={{ color: 'var(--text-light)' }}>Access and download course resources shared by your instructors.</p>
                </div>
                <div style={{ position: 'relative', width: '300px' }}>
                    <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input 
                        type="text" 
                        placeholder="Search by subject or topic..." 
                        style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {materials.map((m) => (
                    <div key={m.id} style={{ 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '24px', 
                        padding: '24px', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow)',
                        transition: 'all 0.3s',
                        cursor: 'default'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div style={{ width: '45px', height: '45px', background: 'rgba(14, 47, 118, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-accent)' }}>
                                <FiFileText size={22} />
                            </div>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
                                <FiStar size={18} />
                            </button>
                        </div>

                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '4px', height: '40px', overflow: 'hidden' }}>{m.title}</h3>
                        <div style={{ fontSize: '12px', color: 'var(--primary-blue)', fontWeight: '700', marginBottom: '16px' }}>{m.subject}</div>

                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', marginBottom: '20px' }}>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Instructor: <strong>{m.instructor}</strong></div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Format: <strong>{m.type}</strong></div>
                        </div>

                        <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '10px', fontSize: '13px' }}>
                            <FiDownload /> Download Resource
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyMaterials;
