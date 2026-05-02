import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DownloadReport = () => {
    const barData = {
        labels: [''], // Only one set of bars as per mockup
        datasets: [
            {
                label: 'Present',
                data: [80],
                backgroundColor: '#27ae60',
            },
            {
                label: 'Absent',
                data: [50],
                backgroundColor: '#e74c3c',
            },
            {
                label: 'Late',
                data: [25],
                backgroundColor: '#f1c40f',
            }
        ]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <label style={{ fontSize: '14px', color: '#555' }}>Select Range</label>
                <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minWidth: '150px' }}>
                    <option>Weekly</option>
                </select>
            </div>

            <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', color: '#194582', marginBottom: '30px' }}>Download Attendance Report</h2>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button style={{
                        background: '#194582',
                        color: 'white',
                        border: 'none',
                        padding: '12px 30px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '15px'
                    }}>
                        <FiDownload /> Download PDF
                    </button>
                    <button style={{
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '12px 30px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '15px'
                    }}>
                        <FiDownload /> Download Excel
                    </button>
                </div>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', color: '#194582', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    Attendance Summary
                </h3>
                
                <div style={{ height: '300px', padding: '0 20px' }}>
                    <Bar data={barData} options={barOptions} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', fontSize: '14px', color: '#555' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', background: '#27ae60' }}></div> Present
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', background: '#e74c3c' }}></div> Absent
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', background: '#f1c40f' }}></div> Late
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DownloadReport;
