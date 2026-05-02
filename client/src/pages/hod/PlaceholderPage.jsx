import React from 'react';
import { FiTool } from 'react-icons/fi';

const PlaceholderPage = ({ title }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#666' }}>
            <div style={{ width: '80px', height: '80px', background: '#f8f9fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <FiTool size={40} color="#4facfe" />
            </div>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>{title}</h2>
            <p style={{ textAlign: 'center', maxWidth: '400px' }}>This module is currently under development. Check back soon for updates to the HOD Dashboard.</p>
        </div>
    );
};

export default PlaceholderPage;
