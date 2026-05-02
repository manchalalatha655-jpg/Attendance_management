import React from 'react';

const Skeleton = ({ width, height, borderRadius = '8px', marginBottom = '0px' }) => {
    return (
        <div style={{
            width: width || '100%',
            height: height || '20px',
            borderRadius: borderRadius,
            marginBottom: marginBottom,
            background: 'linear-gradient(90deg, var(--bg-primary) 25%, var(--bg-secondary) 50%, var(--bg-primary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear'
        }} />
    );
};

export const StatsSkeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card" style={{ padding: '20px' }}>
                <Skeleton height="40px" width="40px" borderRadius="10px" marginBottom="10px" />
                <Skeleton width="60%" height="15px" marginBottom="5px" />
                <Skeleton width="40%" height="25px" />
            </div>
        ))}
    </div>
);

export const TableSkeleton = () => (
    <div className="glass-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Skeleton width="200px" height="30px" />
            <Skeleton width="150px" height="30px" />
        </div>
        {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: 'flex', gap: '20px', padding: '15px 0', borderBottom: '1px solid var(--glass-border)' }}>
                <Skeleton width="30%" />
                <Skeleton width="40%" />
                <Skeleton width="20%" />
                <Skeleton width="10%" />
            </div>
        ))}
    </div>
);

// Add keyframes to index.css if not there
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
document.head.appendChild(style);

export default Skeleton;
