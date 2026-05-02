import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiLock, FiShield, FiArrowLeft, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setStatus('loading');
        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            setStatus('success');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Link might be invalid or expired.');
            setStatus('error');
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

                {status !== 'success' ? (
                    <>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0E2F76', marginBottom: '12px' }}>Reset Password</h2>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
                            Secure your account by entering a new password below.
                        </p>

                        {error && (
                            <div style={{ background: '#fee2e2', color: '#ef4444', padding: '12px', borderRadius: '10px', marginBottom: '24px', fontSize: '14px', fontWeight: '600' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ position: 'relative', textAlign: 'left' }}>
                                <label style={{ fontSize: '12px', fontWeight: '800', color: '#0E2F76', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <FiLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#0E2F76' }} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            width: '100%', padding: '14px 48px 14px 48px', borderRadius: '12px',
                                            background: '#AAC0E1', border: 'none', color: '#0E2F76', fontWeight: '700'
                                        }}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#0E2F76', cursor: 'pointer' }}
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div style={{ position: 'relative', textAlign: 'left' }}>
                                <label style={{ fontSize: '12px', fontWeight: '800', color: '#0E2F76', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Confirm New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <FiLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#0E2F76' }} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                disabled={status === 'loading'}
                                style={{
                                    background: '#0E2F76', color: 'white', padding: '16px', borderRadius: '12px',
                                    border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                                    marginTop: '8px'
                                }}
                            >
                                {status === 'loading' ? 'Resetting Password...' : 'Update Password'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="animate-fade-in">
                        <FiCheckCircle size={64} color="#10b981" style={{ marginBottom: '24px' }} />
                        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0E2F76', marginBottom: '12px' }}>Password Updated!</h2>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
                            Your password has been successfully reset. Redirecting you to the login page now...
                        </p>
                        <div style={{ width: '100%', height: '4px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: '100%', height: '100%', background: '#10b981', transition: 'width 3s linear' }} />
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
                    <Link to="/login" style={{ color: '#0E2F76', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
                        <FiArrowLeft /> Return to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
