import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
    return (
        <div style={{ display: 'flex', background: '#f8f9fc', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: 'var(--sidebar-width)' }}>
                <div style={{ padding: '30px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
