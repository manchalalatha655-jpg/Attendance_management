import React, { useState } from 'react';
import { FiSearch, FiUser, FiBook, FiArrowRight, FiCheckCircle, FiClock, FiCalendar, FiHash } from 'react-icons/fi';

const IssueReturn = () => {
    const [activeTab, setActiveTab] = useState('issue');
    const [searchStudent, setSearchStudent] = useState('');
    const [searchBook, setSearchBook] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleSearchStudent = () => {
        // Mock student search
        if (searchStudent.toLowerCase() === 'john') {
            setSelectedStudent({ name: 'John Doe', roll: 'STU105', dept: 'CSE', fine: 0 });
        } else {
            alert('Student not found. Try "John"');
        }
    };

    const handleSearchBook = () => {
        // Mock book search
        if (searchBook.toLowerCase() === 'data') {
            setSelectedBook({ title: 'Data Structures', author: 'N. Karumanchi', isbn: '978-81921', status: 'Available' });
        } else {
            alert('Book not found. Try "data"');
        }
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0 }}>Circulation Management</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Process book issuances and returns with integrated student validation.</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1px' }}>
                <button onClick={() => setActiveTab('issue')} style={{ 
                    padding: '12px 24px', background: 'none', border: 'none', 
                    borderBottom: activeTab === 'issue' ? '3px solid var(--primary-blue)' : '3px solid transparent',
                    color: activeTab === 'issue' ? 'var(--primary-blue)' : 'var(--text-light)',
                    fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s', fontSize: '15px'
                }}>
                    Issue Resource
                </button>
                <button onClick={() => setActiveTab('return')} style={{ 
                    padding: '12px 24px', background: 'none', border: 'none', 
                    borderBottom: activeTab === 'return' ? '3px solid var(--primary-blue)' : '3px solid transparent',
                    color: activeTab === 'return' ? 'var(--primary-blue)' : 'var(--text-light)',
                    fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s', fontSize: '15px'
                }}>
                    Process Return
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Step 1: Student Verification */}
                <div className="card">
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-primary)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>1</div>
                        Student Verification
                    </h3>
                    
                    <div style={{ position: 'relative', marginBottom: '24px' }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input 
                            placeholder="Enter Student Roll Number or Name..." 
                            value={searchStudent}
                            onChange={e => setSearchStudent(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSearchStudent()}
                            style={searchFieldStyle} 
                        />
                        <button onClick={handleSearchStudent} className="btn-primary" style={{ position: 'absolute', right: '6px', top: '6px', bottom: '6px', padding: '0 16px', fontSize: '13px' }}>Verify</button>
                    </div>

                    {selectedStudent ? (
                        <div style={profileCardStyle}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'var(--blue-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: '800' }}>
                                    {selectedStudent.name.charAt(0)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '18px' }}>{selectedStudent.name}</h4>
                                    <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)', fontSize: '13px' }}>{selectedStudent.roll} • {selectedStudent.dept}</p>
                                </div>
                                <FiCheckCircle color="#059669" size={24} />
                            </div>
                            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-primary)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '700' }}>Library Dues:</span>
                                <span style={{ fontSize: '12px', color: selectedStudent.fine > 0 ? 'var(--accent-red)' : '#059669', fontWeight: '800' }}>{selectedStudent.fine === 0 ? 'CLEARED' : `₹${selectedStudent.fine}`}</span>
                            </div>
                        </div>
                    ) : (
                        <div style={emptyStateStyle}>
                            <FiUser size={40} style={{ opacity: 0.2, marginBottom: '12px' }} />
                            <p>Verify a student to proceed</p>
                        </div>
                    )}
                </div>

                {/* Step 2: Resource Assignment */}
                <div className="card">
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-primary)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>2</div>
                        Resource Selection
                    </h3>

                    <div style={{ position: 'relative', marginBottom: '24px' }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input 
                            placeholder="Scan ISBN or Search Book Title..." 
                            value={searchBook}
                            onChange={e => setSearchBook(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSearchBook()}
                            style={searchFieldStyle} 
                        />
                        <button onClick={handleSearchBook} className="btn-primary" style={{ position: 'absolute', right: '6px', top: '6px', bottom: '6px', padding: '0 16px', fontSize: '13px' }}>Find</button>
                    </div>

                    {selectedBook ? (
                        <div style={profileCardStyle}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)', fontSize: '24px' }}>
                                    <FiBook />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '18px' }}>{selectedBook.title}</h4>
                                    <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)', fontSize: '13px' }}>Author: {selectedBook.author}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', background: 'rgba(5, 150, 105, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>{selectedBook.status.toUpperCase()}</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '10px' }}>
                                    <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block', fontWeight: '800' }}>ISBN</span>
                                    <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '700' }}>{selectedBook.isbn}</span>
                                </div>
                                <div style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '10px' }}>
                                    <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block', fontWeight: '800' }}>DUE DATE</span>
                                    <span style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: '700' }}>{new Date(Date.now() + 14 * 86400000).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={emptyStateStyle}>
                            <FiBook size={40} style={{ opacity: 0.2, marginBottom: '12px' }} />
                            <p>Select a book to process</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Confirmation Footer */}
            {selectedStudent && selectedBook && (
                <div style={{ marginTop: '32px', animation: 'slideUp 0.4s ease' }}>
                    <div className="card" style={{ border: '1px solid var(--primary-blue)', background: 'rgba(37, 99, 235, 0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px' }}>
                        <div>
                            <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '20px', fontWeight: '800' }}>Confirm {activeTab === 'issue' ? 'Issuance' : 'Return'}</h4>
                            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>
                                <strong>{selectedBook.title}</strong> to be {activeTab === 'issue' ? 'issued to' : 'returned by'} <strong>{selectedStudent.name}</strong>
                            </p>
                        </div>
                        <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {activeTab === 'issue' ? 'Process Issuance' : 'Process Return'}
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

const searchFieldStyle = {
    width: '100%', padding: '14px 100px 14px 48px', borderRadius: '14px',
    background: 'var(--bg-primary)', border: '1px solid var(--glass-border)',
    color: 'var(--text-primary)', outline: 'none', fontSize: '15px'
};

const emptyStateStyle = {
    height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-primary)', borderRadius: '16px', border: '2px dashed var(--glass-border)',
    color: 'var(--text-light)', fontSize: '14px', fontWeight: '600'
};

const profileCardStyle = {
    padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)',
    background: 'white', animation: 'fadeIn 0.3s ease'
};

export default IssueReturn;
