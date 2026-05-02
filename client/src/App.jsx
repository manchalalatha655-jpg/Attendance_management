import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import TeacherLayout from './components/TeacherLayout';
import DashboardHome from './pages/teacher/DashboardHome';
import MarkAttendance from './pages/teacher/MarkAttendance';
import ViewAttendance from './pages/teacher/ViewAttendance';
import GenerateReports from './pages/teacher/GenerateReports';
import Settings from './pages/teacher/Settings';
import MyClasses from './pages/teacher/MyClasses';
import StudentRecords from './pages/teacher/StudentRecords';
import TimetablePage from './pages/teacher/Timetable';
import LeaveManagementTeacher from './pages/teacher/LeaveManagement';
import ShortageAlerts from './pages/teacher/ShortageAlerts';
import StudyMaterials from './pages/teacher/StudyMaterials';
import StudentDashboard from './pages/StudentDashboard';
import HODDashboard from './pages/HODDashboard';
import ProfilePage from './pages/ProfilePage';
import StudentLayout from './components/StudentLayout';
import StudentDashboardHome from './pages/student/DashboardHome';
import StudentViewAttendance from './pages/student/ViewAttendance';
import StudentDownloadReport from './pages/student/DownloadReport';
import StudentSettings from './pages/student/Settings';
import EnrolledSubjects from './pages/student/EnrolledSubjects';
import MyTimetable from './pages/student/MyTimetable';
import LeaveApplicationStudent from './pages/student/LeaveApplication';
import StudyMaterialsStudent from './pages/student/StudyMaterials';
import NotificationsStudent from './pages/student/Notifications';
import HODLayout from './components/HODLayout';
import HODDashboardHome from './pages/hod/DashboardHome';
import HODManageFaculty from './pages/hod/ManageFaculty';
import HODManageStudents from './pages/hod/ManageStudents';
import DeptClasses from './pages/hod/DeptClasses';
import AttendanceReports from './pages/hod/AttendanceReports';
import LeaveRequests from './pages/hod/LeaveRequests';
import TimetableManagement from './pages/hod/TimetableManagement';
import PerformanceAnalytics from './pages/hod/PerformanceAnalytics';
import HODSettings from './pages/hod/HODSettings';
import PlaceholderPage from './pages/hod/PlaceholderPage';
import LibrarianLayout from './components/LibrarianLayout';
import LibrarianDashboardHome from './pages/librarian/DashboardHome';
import LibrarianInventory from './pages/librarian/Inventory';
import LibrarianIssueReturn from './pages/librarian/IssueReturn';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import AddClass from './pages/admin/classes/AddClass';
import ManageHODs from './pages/admin/hods/ManageHODs';
import ViewClasses from './pages/admin/classes/ViewClasses';
import AssignTeacher from './pages/admin/classes/AssignTeacher';
import AssignSubjects from './pages/admin/classes/AssignSubjects';
import StudentAllocation from './pages/admin/classes/StudentAllocation';
import Timetable from './pages/admin/classes/Timetable';
import AddTeacher from './pages/admin/teachers/AddTeacher';
import ViewTeachers from './pages/admin/teachers/ViewTeachers';
import AssignSubjectsTeacher from './pages/admin/teachers/AssignSubjectsTeacher';
import AssignClassesTeacher from './pages/admin/teachers/AssignClassesTeacher';
import TeacherProfile from './pages/admin/teachers/TeacherProfile';
import ViewStudents from './pages/admin/students/ViewStudents';
import ManageSessions from './pages/admin/sessions/ManageSessions';
import ManageDepartments from './pages/admin/departments/ManageDepartments';
import ManageRoles from './pages/admin/roles/ManageRoles';
import AttendanceMonitor from './pages/admin/attendance/AttendanceMonitor';
import LeaveManagement from './pages/admin/leave/LeaveManagement';
import AdminReports from './pages/admin/reports/AdminReports';
import AdminNotifications from './pages/admin/notifications/AdminNotifications';
import SystemSettings from './pages/admin/settings/SystemSettings';
import AdminProfile from './pages/admin/profile/AdminProfile';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

const AdminLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--admin-bg)', color: 'var(--text-primary)', transition: 'background 0.3s, color 0.3s' }}>
            <Navbar />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                <div style={{ 
                    flex: 1, 
                    marginLeft: 'var(--sidebar-width)', 
                    background: 'var(--admin-bg)',
                    minHeight: 'calc(100vh - 70px)',
                    padding: '30px',
                    transition: 'background 0.3s'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const DefaultLayout = ({ children }) => {
    const { user } = useAuth();
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background 0.3s, color 0.3s' }}>
            {user && <Navbar />}
            {children}
        </div>
    );
};

function AppRoutes() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                
                <Route path="/admin/*" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminLayout>
                            <Routes>
                                <Route path="/" element={<AdminDashboard />} />
                                <Route path="/classes/add" element={<AddClass />} />
                                <Route path="/classes/view" element={<ViewClasses />} />
                                <Route path="/classes/assign-teacher" element={<AssignTeacher />} />
                                <Route path="/classes/assign-subjects" element={<AssignSubjects />} />
                                <Route path="/classes/allocation" element={<StudentAllocation />} />
                                <Route path="/classes/timetable" element={<Timetable />} />
                                <Route path="/teachers/add" element={<AddTeacher />} />
                                <Route path="/teachers/view" element={<ViewTeachers />} />
                                <Route path="/teachers/assign-subjects" element={<AssignSubjectsTeacher />} />
                                <Route path="/teachers/assign-classes" element={<AssignClassesTeacher />} />
                                <Route path="/teachers/profile/:id" element={<TeacherProfile />} />
                                <Route path="/teachers/profile" element={<TeacherProfile />} />
                                <Route path="/students" element={<ViewStudents />} />
                                <Route path="/sessions" element={<ManageSessions />} />
                                {/* New Admin Routes */}
                                <Route path="/hods" element={<ManageHODs />} />
                                <Route path="/departments" element={<ManageDepartments />} />
                                <Route path="/roles" element={<ManageRoles />} />
                                <Route path="/attendance" element={<AttendanceMonitor />} />
                                <Route path="/leave" element={<LeaveManagement />} />
                                <Route path="/reports" element={<AdminReports />} />
                                <Route path="/notifications" element={<AdminNotifications />} />
                                <Route path="/settings" element={<SystemSettings />} />
                                <Route path="/profile" element={<AdminProfile />} />
                            </Routes>
                        </AdminLayout>
                    </ProtectedRoute>
                } />

                <Route path="/teacher/*" element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                        <TeacherLayout>
                            <Routes>
                                <Route path="dashboard" element={<DashboardHome />} />
                                <Route path="classes" element={<MyClasses />} />
                                <Route path="mark-attendance" element={<MarkAttendance />} />
                                <Route path="records" element={<StudentRecords />} />
                                <Route path="view-attendance" element={<ViewAttendance />} />
                                <Route path="timetable" element={<TimetablePage />} />
                                <Route path="leave" element={<LeaveManagementTeacher />} />
                                <Route path="reports" element={<GenerateReports />} />
                                <Route path="alerts" element={<ShortageAlerts />} />
                                <Route path="materials" element={<StudyMaterials />} />
                                <Route path="settings" element={<Settings />} />
                                <Route path="/" element={<Navigate to="dashboard" replace />} />
                            </Routes>
                        </TeacherLayout>
                    </ProtectedRoute>
                } />

                <Route path="/student/*" element={
                    <ProtectedRoute allowedRoles={['student']}>
                        <StudentLayout>
                            <Routes>
                                <Route path="dashboard" element={<StudentDashboardHome />} />
                                <Route path="my-attendance" element={<StudentViewAttendance />} />
                                <Route path="subjects" element={<EnrolledSubjects />} />
                                <Route path="timetable" element={<MyTimetable />} />
                                <Route path="leave" element={<LeaveApplicationStudent />} />
                                <Route path="reports" element={<StudentDownloadReport />} />
                                <Route path="materials" element={<StudyMaterialsStudent />} />
                                <Route path="notifications" element={<NotificationsStudent />} />
                                <Route path="settings" element={<StudentSettings />} />
                                <Route path="/" element={<Navigate to="dashboard" replace />} />
                            </Routes>
                        </StudentLayout>
                    </ProtectedRoute>
                } />

                <Route path="/hod/*" element={
                    <ProtectedRoute allowedRoles={['hod']}>
                        <HODLayout>
                            <Routes>
                                <Route path="dashboard" element={<HODDashboardHome />} />
                                <Route path="faculty" element={<HODManageFaculty />} />
                                <Route path="students" element={<HODManageStudents />} />
                                <Route path="classes" element={<DeptClasses />} />
                                <Route path="reports" element={<AttendanceReports />} />
                                <Route path="leave" element={<LeaveRequests />} />
                                <Route path="timetable" element={<TimetableManagement />} />
                                <Route path="analytics" element={<PerformanceAnalytics />} />
                                <Route path="settings" element={<HODSettings />} />
                                <Route path="/" element={<Navigate to="dashboard" replace />} />
                            </Routes>
                        </HODLayout>
                    </ProtectedRoute>
                } />

                <Route path="/librarian/*" element={
                    <ProtectedRoute allowedRoles={['librarian']}>
                        <LibrarianLayout>
                            <Routes>
                                <Route path="dashboard" element={<LibrarianDashboardHome />} />
                                <Route path="books" element={<LibrarianInventory />} />
                                <Route path="students" element={<PlaceholderPage title="Student Library Access" />} />
                                <Route path="issue" element={<LibrarianIssueReturn />} />
                                <Route path="settings" element={<PlaceholderPage title="Profile Settings" />} />
                                <Route path="/" element={<Navigate to="dashboard" replace />} />
                            </Routes>
                        </LibrarianLayout>
                    </ProtectedRoute>
                } />

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <DefaultLayout><ProfilePage /></DefaultLayout>
                    </ProtectedRoute>
                } />

                <Route path="/" element={
                    user ? (
                        <Navigate to={`/${user.role}`} />
                    ) : (
                        <Navigate to="/login" />
                    )
                } />
            </Routes>
            {/* Global ChatBot - visible on all pages when logged in */}
            <ChatBot />
        </Router>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
