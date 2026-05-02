import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiShield, FiUsers, FiUserCheck, FiBookOpen, 
  FiHash, FiCheckSquare, FiCheck, FiX, FiLoader, FiCalendar, FiCheckCircle, FiUserPlus 
} from 'react-icons/fi';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    adminId: '',
    accessCode: '',
    hodId: '',
    department: '',
    employeeId: '',
    subject: '',
    rollNo: '',
    year: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const roles = [
    { id: 'admin', label: 'Admin', icon: FiShield, desc: 'System Administrator', color: '#2563eb' },
    { id: 'hod', label: 'HOD', icon: FiUsers, desc: 'Head of Department', color: '#059669' },
    { id: 'faculty', label: 'Faculty', icon: FiUserCheck, desc: 'Teaching Faculty', color: '#0891b2' },
    { id: 'student', label: 'Student', icon: FiUser, desc: 'Student User', color: '#ea580c' },
    { id: 'librarian', label: 'Librarian', icon: FiBookOpen, desc: 'Library Management', color: '#7c3aed' }
  ];

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'MBA'];
  const subjects = ['Maths', 'Physics', 'Chemistry', 'Programming', 'Database'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const rolePermissions = {
    admin: ['Full system access', 'Manage users', 'View reports'],
    hod: ['Manage department', 'Approve requests'],
    faculty: ['Mark attendance', 'View records'],
    student: ['View attendance', 'Apply leave'],
    librarian: ['Manage books', 'Track issues', 'View student info']
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 6) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
    setErrors({});
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email address required';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!termsAgreed) newErrors.terms = 'You must agree to terms';

    switch (formData.role) {
      case 'admin':
        if (!formData.adminId.trim()) newErrors.adminId = 'Admin ID required';
        if (!formData.accessCode.trim()) newErrors.accessCode = 'Access Code required';
        break;
      case 'hod':
        if (!formData.hodId.trim()) newErrors.hodId = 'HOD ID required';
        break;
      case 'faculty':
        if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID required';
        break;
      case 'student':
        if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll Number required';
        break;
    }
    if (formData.department === '') newErrors.department = 'Department required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        role: formData.role === 'faculty' ? 'teacher' : formData.role,
        studentId: formData.role === 'student' ? formData.rollNo : undefined,
      };
      await axios.post('http://localhost:5000/api/auth/register', submitData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = roles.find(r => r.id === formData.role);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, transparent 70%)', top: '-300px', left: '-100px' }} />
      <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 23, 42, 0.03) 0%, transparent 70%)', bottom: '-100px', right: '-100px' }} />

      <div className="grid-container" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 2fr 1.2fr',
        gap: '30px',
        width: '100%',
        maxWidth: '1440px',
        height: '92vh',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left Info Panel */}
        <div style={{
          background: 'var(--primary-gradient)',
          borderRadius: '24px',
          padding: '48px 40px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div>
            <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '24px' }}>🎓</div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', lineHeight: 1.1, letterSpacing: '-1px' }}>
              Institutional Registration
            </h1>
            <p style={{ fontSize: '16px', opacity: 0.8, lineHeight: 1.6 }}>Join the VEMU Institute network and streamline your academic attendance management.</p>
          </div>
          
          <div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {roles.map((role) => (
                <div key={role.id} onClick={() => handleRoleChange(role.id)} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: formData.role === role.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  border: formData.role === role.id ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                  transition: 'all 0.3s'
                }}>
                  <div style={{ fontSize: '20px', color: formData.role === role.id ? 'white' : 'rgba(255,255,255,0.6)' }}>
                    <role.icon />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>{role.label}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>{role.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            Already registered? <Link to="/login" style={{ color: 'white', fontWeight: '700', textDecoration: 'underline' }}>Sign In</Link>
          </div>
        </div>

        {/* Middle Form Area */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Create Account</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Please provide your details for {selectedRole?.label} access.</p>
          </div>

          {errors.submit && (
            <div style={{ background: 'rgba(239, 68, 68, 0.05)', color: 'var(--accent-red)', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
              <FiX style={{ marginRight: '8px' }} /> {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <FiUser style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', paddingLeft: '48px' }} />
                {errors.name && <span style={errorLabelStyle}>{errors.name}</span>}
              </div>
              <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} style={{ width: '100%', paddingLeft: '48px' }} />
                {errors.email && <span style={errorLabelStyle}>{errors.email}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <FiUser style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} style={{ width: '100%', paddingLeft: '48px' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <FiPhone style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', paddingLeft: '48px' }} />
                {errors.phone && <span style={errorLabelStyle}>{errors.phone}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={{ width: '100%', paddingLeft: '48px' }} />
                <button type="button" onClick={togglePassword} style={eyeButtonStyle}>{showPassword ? <FiEyeOff /> : <FiEye />}</button>
                {errors.password && <span style={errorLabelStyle}>{errors.password}</span>}
              </div>
              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} style={{ width: '100%', paddingLeft: '48px' }} />
                <button type="button" onClick={toggleConfirmPassword} style={eyeButtonStyle}>{showConfirmPassword ? <FiEyeOff /> : <FiEye />}</button>
                {errors.confirmPassword && <span style={errorLabelStyle}>{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Dynamic Fields */}
            <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'grid', gap: '20px' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--primary-blue)', margin: 0, fontWeight: '700', textTransform: 'uppercase' }}>Professional Details</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {formData.role === 'admin' && (
                  <>
                    <input name="adminId" placeholder="Admin ID" value={formData.adminId} onChange={handleInputChange} />
                    <input name="accessCode" placeholder="Access Code" value={formData.accessCode} onChange={handleInputChange} />
                  </>
                )}
                {formData.role === 'hod' && <input name="hodId" placeholder="HOD Employee ID" value={formData.hodId} onChange={handleInputChange} />}
                {formData.role === 'faculty' && (
                  <>
                    <input name="employeeId" placeholder="Faculty ID" value={formData.employeeId} onChange={handleInputChange} />
                    <select name="subject" value={formData.subject} onChange={handleInputChange}>
                      <option value="">Primary Subject</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </>
                )}
                {formData.role === 'student' && (
                  <>
                    <input name="rollNo" placeholder="Roll Number" value={formData.rollNo} onChange={handleInputChange} />
                    <select name="year" value={formData.year} onChange={handleInputChange}>
                      <option value="">Academic Year</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </>
                )}
                <select name="department" value={formData.department} onChange={handleInputChange}>
                  <option value="">Department</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
              <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              <span style={{ color: 'var(--text-secondary)' }}>I agree to the Institutional Terms and Privacy Policy</span>
            </label>

            <button type="submit" disabled={loading || !termsAgreed} className="btn-primary" style={{ padding: '16px', fontSize: '16px' }}>
              {loading ? <FiLoader className="animate-spin" /> : `Create ${selectedRole?.label} Account`}
            </button>
          </form>
        </div>

        {/* Right Feature Panel */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>Access Privileges</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {rolePermissions[formData.role]?.map((perm, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', marginTop: '2px' }}>
                  <FiCheck />
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{perm}</span>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: 'auto', padding: '20px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Registration requests are reviewed by the system administrator within 24-48 hours.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .grid-container { animation: fadeIn 0.6s ease-out; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

const errorLabelStyle = { color: 'var(--accent-red)', fontSize: '11px', marginTop: '4px', display: 'block' };
const eyeButtonStyle = { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' };

export default RegisterPage;
