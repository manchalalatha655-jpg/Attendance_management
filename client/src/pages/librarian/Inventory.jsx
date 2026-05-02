import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiBook, FiPlus, FiSearch, FiEdit2, FiTrash2, FiBookOpen, FiBookmark, FiHash, FiUser } from 'react-icons/fi';

const Inventory = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editBook, setEditBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        quantity: 1,
        shelf: ''
    });

    // Mock data for demo if backend isn't ready
    const mockBooks = [
        { _id: '1', title: 'Data Structures & Algorithms', author: 'Narasimha Karumanchi', isbn: '978-8192107592', category: 'Computer Science', quantity: 15, shelf: 'A-101' },
        { _id: '2', title: 'Operating System Concepts', author: 'Silberschatz', isbn: '978-1118063330', category: 'Computer Science', quantity: 8, shelf: 'A-102' },
        { _id: '3', title: 'Modern Digital Electronics', author: 'R.P. Jain', isbn: '978-0070669116', category: 'Electronics', quantity: 12, shelf: 'B-205' },
    ];

    useEffect(() => {
        // In a real app, fetch from backend
        // const fetchBooks = async () => { ... }
        setTimeout(() => {
            setBooks(mockBooks);
            setLoading(false);
        }, 800);
    }, []);

    const filteredBooks = books.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.isbn.includes(searchTerm)
    );

    const handleOpenModal = (book = null) => {
        if (book) {
            setEditBook(book);
            setFormData(book);
        } else {
            setEditBook(null);
            setFormData({ title: '', author: '', isbn: '', category: '', quantity: 1, shelf: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend integration would go here
        if (editBook) {
            setBooks(books.map(b => b._id === editBook._id ? { ...formData, _id: editBook._id } : b));
        } else {
            setBooks([...books, { ...formData, _id: Date.now().toString() }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '26px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>Book Inventory</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Managing institutional library resources and cataloging.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="btn-primary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiPlus size={18} /> Register New Title
                </button>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input 
                            type="text" 
                            placeholder="Search by title, author or ISBN..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '12px 12px 12px 44px', 
                                background: 'var(--bg-primary)', 
                                border: '1px solid var(--glass-border)', 
                                borderRadius: '12px', 
                                fontSize: '14px', 
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                        <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--bg-primary)', borderTopColor: 'var(--primary-blue)', borderRadius: '50%', margin: '0 auto 20px' }}></div>
                        Cataloging Resources...
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Book Details</th>
                                    <th>ISBN Code</th>
                                    <th>Category</th>
                                    <th>Inventory</th>
                                    <th>Location</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.length > 0 ? filteredBooks.map((b) => (
                                    <tr key={b._id}>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{ width: '42px', height: '42px', background: 'var(--blue-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                                    <FiBook size={20} />
                                                </div>
                                                <div>
                                                    <div style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '15px' }}>{b.title}</div>
                                                    <div style={{ color: 'var(--text-light)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <FiUser size={12} /> {b.author}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                                <FiHash size={14} color="var(--primary-blue)" /> {b.isbn}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ background: 'var(--bg-primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                                {b.category}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ color: b.quantity > 5 ? '#059669' : 'var(--accent-red)', fontWeight: '800' }}>{b.quantity}</span>
                                                <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600' }}>COPIES</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                                <FiBookmark size={14} color="var(--primary-blue)" /> {b.shelf}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                                <button onClick={() => handleOpenModal(b)} style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '8px', color: 'var(--primary-blue)', cursor: 'pointer' }}><FiEdit2 size={16} /></button>
                                                <button style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', color: 'var(--accent-red)', cursor: 'pointer' }}><FiTrash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '60px' }}>
                                            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>📚</div>
                                            <div style={{ color: 'var(--text-light)', fontWeight: '600' }}>No resources matching your search in the repository.</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Book Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '20px' }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
                        <h2 style={{ margin: '0 0 24px 0', color: 'var(--text-primary)', fontSize: '24px', fontWeight: '800' }}>{editBook ? 'Modify Title Record' : 'Catalog New Resource'}</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                            <div style={modalGroupStyle}>
                                <label style={modalLabelStyle}>Book Title</label>
                                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={modalInputStyle} placeholder="e.g. Introduction to Algorithms" />
                            </div>
                            <div style={modalGroupStyle}>
                                <label style={modalLabelStyle}>Primary Author</label>
                                <input value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} required style={modalInputStyle} placeholder="e.g. Thomas H. Cormen" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>ISBN Code</label>
                                    <input value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} required style={modalInputStyle} placeholder="978-X-XX-XXXXXX-X" />
                                </div>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>Category</label>
                                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required style={modalInputStyle}>
                                        <option value="">Select Genre</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Management">Management</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>In-Stock Quantity</label>
                                    <input type="number" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} required style={modalInputStyle} min="1" />
                                </div>
                                <div style={modalGroupStyle}>
                                    <label style={modalLabelStyle}>Shelf Location</label>
                                    <input value={formData.shelf} onChange={e => setFormData({...formData, shelf: e.target.value})} required style={modalInputStyle} placeholder="e.g. A-203" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary" style={{ flex: 1, padding: '14px' }}>Discard</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '14px' }}>{editBook ? 'Update Catalog' : 'Add to Inventory'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                table { width: 100%; border-collapse: collapse; }
                th { background: var(--bg-primary); padding: 18px 24px; text-align: left; color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; border-bottom: 1px solid var(--glass-border); }
                td { padding: 16px 24px; border-bottom: 1px solid var(--glass-border); color: var(--text-secondary); font-size: 14px; vertical-align: middle; }
                tr:hover { background: rgba(37, 99, 235, 0.02); }
            `}</style>
        </div>
    );
};

const modalGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const modalLabelStyle = { fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' };
const modalInputStyle = {
    padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-primary)',
    border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none', fontSize: '14px'
};

export default Inventory;
