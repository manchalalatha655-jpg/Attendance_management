import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';

const TeacherProfile = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTeacher = async () => {
            if (!id) { setLoading(false); return; }
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const res = await axios.get('http://localhost:5000/api/admin/teachers-manage', config);
                const found = res.data.find(t => t._id === id);
                setTeacher(found || null);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchTeacher();
    }, [id, user.token]);

    if (loading) return <div style={{ color: 'var(--text-primary)', padding: '40px', textAlign: 'center' }}>Loading...</div>;

    if (!id || !teacher) return (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
            <p style={{ fontSize: '16px' }}>No teacher selected.</p>
            <p style={{ fontSize: '13px', marginTop: '8px' }}>Go to <strong>View Teachers</strong> and click the profile icon.</p>
        </div>
    );

    const InfoItem = ({ label, value }) => (
        <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-light)', marginBottom: '4px' }}>{label}</p>
            <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '500' }}>{value || '—'}</p>
        </div>
    );

    return (
        <div>
            <h2 style={{ marginBottom: '6px', color: 'var(--admin-primary)', fontSize: '22px', fontWeight: '700' }}>Teacher Profile</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px', fontSize: '14px' }}>Full details for {teacher.name}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Personal Info */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--admin-primary)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--glass-border)' }}>
                        Personal Information
                    </h3>
                    <InfoItem label="Full Name" value={teacher.name} />
                    <InfoItem label="Email Address" value={teacher.email} />
                    <InfoItem label="Phone Number" value={teacher.phone} />
                    <InfoItem label="Department" value={teacher.department?.name || teacher.department} />
                    <InfoItem label="Qualification" value={teacher.qualification} />
                </div>

                {/* Assignments */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '28px', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--admin-primary)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--glass-border)' }}>
                        Assignments
                    </h3>
                    <InfoItem label="Assigned Class" value={teacher.assignedClass?.name} />
                    <div>
                        <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-light)', marginBottom: '10px' }}>Subjects</p>
                        {teacher.subjects?.length > 0 ? teacher.subjects.map(s => (
                            <div key={s._id} style={{ padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{s.name}</span>
                                <span style={{ color: 'var(--text-light)', fontSize: '12px' }}>{s.code}</span>
                            </div>
                        )) : (
                            <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>No subjects assigned yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
