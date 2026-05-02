import React from 'react';
import { FiPlus, FiFileText, FiDownload, FiTrash2, FiFolder, FiExternalLink } from 'react-icons/fi';

const StudyMaterials = () => {
    const materials = [
        { id: 1, title: 'Introduction to Data Structures', type: 'PDF', size: '2.4 MB', date: '2024-05-01', class: 'CS-101 (A)' },
        { id: 2, title: 'Java Exception Handling Notes', type: 'DOCX', size: '1.8 MB', date: '2024-05-05', class: 'CS-102 (B)' },
        { id: 3, title: 'DBMS Normalization PPT', type: 'PPTX', size: '4.2 MB', date: '2024-05-12', class: 'CS-203 (A)' },
        { id: 4, title: 'Spring Boot Architecture', type: 'PDF', size: '3.1 MB', date: '2024-05-15', class: 'CS-102 (B)' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-accent)', marginBottom: '8px' }}>Study Materials</h2>
                    <p style={{ color: 'var(--text-light)' }}>Upload and share academic resources with your students.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px' }}>
                    <FiPlus /> Upload Material
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {materials.map((m) => (
                    <div key={m.id} style={{ 
                        background: 'var(--bg-secondary)', 
                        borderRadius: '24px', 
                        padding: '24px', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--shadow)',
                        transition: 'all 0.3s'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-accent)' }}>
                                <FiFileText size={24} />
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary-accent)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</h3>
                                <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: '600' }}>{m.type} • {m.size}</div>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(14, 47, 118, 0.05)', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span>Target Class:</span> <strong>{m.class}</strong>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Uploaded:</span> <strong>{m.date}</strong>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--primary-accent)', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                                <FiDownload size={16} /> Download
                            </button>
                            <button style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyMaterials;
