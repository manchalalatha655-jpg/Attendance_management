import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
    FiMail, FiLock, FiUser, FiArrowRight, FiHome, 
    FiEye, FiEyeOff, FiCheckCircle, FiShield 
} from 'react-icons/fi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid institutional email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            const user = await login(email, password);
            navigate(`/${user.role}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            background: '#F5FEFF',
            fontFamily: "'Outfit', sans-serif",
            overflow: 'hidden'
        }}>
            {/* LEFT SECTION - BRANDING & VISUALS */}
            <div style={{
                flex: '1.2',
                background: 'linear-gradient(135deg, #0E2F76 0%, #1e40af 100%)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '80px',
                color: 'white',
                overflow: 'hidden'
            }} className="login-left">
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', top: '-100px', left: '-100px' }} />
                <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: '-50px', right: '-50px' }} />
                <div style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(170, 192, 225, 0.1)', top: '20%', right: '10%' }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                        <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E2F76' }}>
                            <FiShield size={28} />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '1px' }}>VEMU TECH</h2>
                    </div>

                    <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', lineHeight: 1.1, marginBottom: '24px' }}>
                        WELCOME <br />
                        <span style={{ color: '#AAC0E1' }}>Academic Portal</span>
                    </h1>
                    
                    <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '500px', lineHeight: 1.6, marginBottom: '48px' }}>
                        Student Attendance Management System. A professional interface for tracking, reporting, and managing academic attendance with precision.
                    </p>

                    <div style={{ display: 'flex', gap: '32px' }}>
                        <div>
                            <div style={{ fontSize: '32px', fontWeight: '900' }}>100%</div>
                            <div style={{ fontSize: '14px', opacity: 0.7 }}>Secure Access</div>
                        </div>
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                        <div>
                            <div style={{ fontSize: '32px', fontWeight: '900' }}>24/7</div>
                            <div style={{ fontSize: '14px', opacity: 0.7 }}>Real-time Sync</div>
                        </div>
                    </div>
                </div>

                <Link to="/" style={{ 
                    position: 'absolute', bottom: '40px', left: '80px', 
                    color: 'white', textDecoration: 'none', display: 'flex', 
                    alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600',
                    opacity: 0.8, transition: 'opacity 0.3s'
                }}>
                    <FiHome /> Back to Institution Home
                </Link>
            </div>

            {/* RIGHT SECTION - LOGIN FORM */}
            <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                position: 'relative'
            }}>
                <div style={{ width: '100%', maxWidth: '440px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0E2F76', marginBottom: '8px' }}>Login</h2>
                        <p style={{ color: '#64748b', fontSize: '15px' }}>Enter your institutional credentials to access your dashboard.</p>
                    </div>

                    {error && (
                        <div style={{ 
                            background: '#fee2e2', color: '#ef4444', padding: '14px 16px', 
                            borderRadius: '12px', marginBottom: '24px', fontSize: '14px', 
                            fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px',
                            border: '1px solid rgba(239, 68, 68, 0.1)'
                        }}>
                            <FiShield /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* ROLE SELECTION */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#0E2F76', textTransform: 'uppercase', letterSpacing: '1px' }}>Identify Your Role</label>
                            <div style={{ position: 'relative' }}>
                                <FiUser style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#0E2F76', zIndex: 1 }} />
                                <select 
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px',
                                        background: '#AAC0E1', border: 'none', color: '#0E2F76', fontWeight: '700',
                                        fontSize: '15px', appearance: 'none', cursor: 'pointer'
                                    }}
                                >
                                    <option value="student">Student Portal</option>
                                    <option value="teacher">Faculty Member</option>
                                    <option value="hod">Department Head (HOD)</option>
                                    <option value="librarian">Librarian Access</option>
                                    <option value="admin">System Administrator</option>
                                </select>
                            </div>
                        </div>

                        {/* EMAIL FIELD */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#0E2F76', textTransform: 'uppercase', letterSpacing: '1px' }}>Institutional Email</label>
                            <div style={{ position: 'relative' }}>
                                <FiMail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#0E2F76' }} />
                                <input
                                    type="email"
                                    placeholder="e.g. name@vemu.org"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px',
                                        background: '#AAC0E1', border: '2px solid transparent', color: '#0E2F76', 
                                        fontWeight: '700', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#0E2F76'}
                                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                />
                            </div>
                        </div>

                        {/* PASSWORD FIELD */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#0E2F76', textTransform: 'uppercase', letterSpacing: '1px' }}>Secure Password</label>
                            <div style={{ position: 'relative' }}>
                                <FiLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#0E2F76' }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 48px 16px 48px', borderRadius: '12px',
                                        background: '#AAC0E1', border: '2px solid transparent', color: '#0E2F76', 
                                        fontWeight: '700', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#0E2F76'}
                                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#0E2F76', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} style={{ width: '18px', height: '18px', accentColor: '#0E2F76' }} />
                                Remember Me
                            </label>
                            <Link to="/forgot-password" style={{ color: '#0E2F76', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>Forgot Password?</Link>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                                background: '#0E2F76', color: 'white', padding: '16px', borderRadius: '12px',
                                border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                marginTop: '12px', transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(14, 47, 118, 0.2)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {loading ? 'Authenticating...' : 'Login'} <FiArrowRight />
                        </button>
                    </form>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                            Don't have an account? <Link to="/register" style={{ color: '#0E2F76', fontWeight: '800', textDecoration: 'none' }}>Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
