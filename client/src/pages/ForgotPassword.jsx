import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiShield, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [simulatedToken, setSimulatedToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setSubmitted(true);
            // Catching the simulated token for UI demonstration
            if (response.data.resetToken) {
                setSimulatedToken(response.data.resetToken);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please check your email address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F5FEFF',
            fontFamily: "'Outfit', sans-serif",
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '450px',
                background: 'white',
                padding: '48px',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(14, 47, 118, 0.1)',
                border: '1px solid #AAC0E1',
                textAlign: 'center'
            }}>
                <div style={{ 
                    width: '64px', height: '64px', background: '#0E2F76', borderRadius: '16px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    margin: '0 auto 32px'
                }}>
                    <FiShield size={32} />
                </div>

                {!submitted ? (
                    <>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0E2F76', marginBottom: '12px' }}>Forgot Password?</h2>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
                            Enter your institutional email address and we'll send you a link to reset your password.
                        </p>

                        {error && (
                            <div style={{ background: '#fee2e2', color: '#ef4444', padding: '12px', borderRadius: '10px', marginBottom: '24px', fontSize: '14px', fontWeight: '600' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ position: 'relative', textAlign: 'left' }}>
                                <label style={{ fontSize: '12px', fontWeight: '800', color: '#0E2F76', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <FiMail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#0E2F76' }} />
                                    <input
                                        type="email"
                                        placeholder="name@vemu.org"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px',
                                            background: '#AAC0E1', border: 'none', color: '#0E2F76', fontWeight: '700'
                                        }}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                style={{
                                    background: '#0E2F76', color: 'white', padding: '16px', borderRadius: '12px',
                                    border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                                    marginTop: '8px'
                                }}
                            >
                                {loading ? 'Sending Request...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="animate-fade-in">
                        <FiCheckCircle size={64} color="#10b981" style={{ marginBottom: '24px' }} />
                        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0E2F76', marginBottom: '12px' }}>Request Sent!</h2>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
                            Check your email for the reset instructions. We've sent a secure link to <strong>{email}</strong>.
                        </p>
                        
                        {/* Simulated Link for Developer/User convenience */}
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '32px', border: '1px dashed #cbd5e1' }}>
                            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>[Development Mode: Simulated Reset Link]</p>
                            <Link to={`/reset-password/${simulatedToken}`} style={{ color: '#0E2F76', fontWeight: '800', wordBreak: 'break-all' }}>
                                Reset My Password
                            </Link>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
                    <Link to="/login" style={{ color: '#0E2F76', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
                        <FiArrowLeft /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
