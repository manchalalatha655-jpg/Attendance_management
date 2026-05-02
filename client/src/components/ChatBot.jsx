import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu, FiTrash2 } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// Smart rule-based responses for common attendance/academic questions
const getSmartResponse = (input) => {
    const q = input.toLowerCase().trim();

    // Greeting & Identity
    if (q.match(/hello|hi|hey|greet|who are you/)) {
        return "Hello! 👋 I'm your **VEMU AMS Assistant**. I can help you navigate the system, understand attendance policies, or troubleshoot common tasks. Ask me about:\n\n• Marking/Viewing attendance\n• Downloading PDF/Excel reports\n• Leave applications\n• Role-specific features (Admin/HOD/Teacher)\n• Subject & Class management";
    }

    // Attendance Core Logic
    if (q.match(/attendance.*below|shortage|low attendance|defaulter|minimum|required/)) {
        return "📊 **Attendance Policy:**\n- **Minimum Required:** 75% per subject.\n- **Defaulters:** Students below 75% are highlighted in red and flagged in the 'Shortage Alerts' section.\n- **Notifications:** The system automatically notifies students when they fall below the threshold.\n- **Condonation:** In special medical cases, HODs can review attendance records for condonation (up to 10% waiver usually).";
    }

    if (q.match(/how.*mark attendance|mark.*attendance|attendance mark/)) {
        return "✅ **How to Mark Attendance (Faculty):**\n1. Log in to your **Teacher Dashboard**.\n2. Navigate to **Mark Attendance** in the sidebar.\n3. Select the **Class**, **Section**, and **Subject**.\n4. You will see a list of students. By default, all are set to 'Present'.\n5. Toggle the switch for students who are 'Absent' or 'Late'.\n6. Click **Submit Attendance** to save.\n*Tip: You can edit today's attendance until the end of the day.*";
    }

    if (q.match(/view.*attendance|check.*attendance|my attendance/)) {
        return "🔍 **How to View Attendance:**\n- **Students:** Your dashboard shows a real-time card with your total percentage. Click on **'My Attendance'** to see subject-wise breakdowns.\n- **Faculty:** Use **'View Attendance'** to see historical data for your assigned classes.\n- **Admin/HOD:** Use the **'Attendance Monitor'** to see department-wide trends and individual student reports.";
    }

    // Reports & Analytics
    if (q.match(/download.*report|export.*report|pdf|excel|generate.*report/)) {
        return "📥 **Reporting System:**\n- **Master Report:** Admin can download a complete system-wide Excel report from the **Reports** section.\n- **Subject Report:** Faculty can generate PDF reports for specific subjects and classes.\n- **Student Report:** Students can download their personal attendance history as a PDF for proof of attendance.\n- **Formats:** We support high-quality **PDF** (printable) and **Excel/XLSX** (for data analysis).";
    }

    // Leave Management
    if (q.match(/leave.*apply|apply.*leave|medical.*leave|absent.*permission/)) {
        return "📋 **Leave Management:**\n- **Applying:** Go to the **Leave** section. Fill in the start/end dates, type (Sick, Casual, Duty), and reason.\n- **Approval Flow:** Your request is sent to your **HOD** or **Admin** for review.\n- **Notifications:** You'll receive a notification once your leave is Approved or Rejected.\n- **Attendance Impact:** Approved leaves are marked in the system and don't negatively impact your 'Defaulter' status in some configurations.";
    }

    // Role Specific
    if (q.match(/hod|head of department/)) {
        return "🏛️ **HOD (Head of Department) Portal:**\n- **Management:** View all Faculty and Students in your specific department.\n- **Academic Control:** Manage department-specific classes, sections, and subjects.\n- **Monitoring:** Track real-time attendance trends and approve leave requests.\n- **Analytics:** Access detailed performance analytics to improve student engagement.";
    }

    if (q.match(/admin|administrator/)) {
        return "⚙️ **Admin Control Center:**\n- **User Management:** Create, update, or delete any user (HOD, Teacher, Student, Librarian).\n- **System Config:** Define academic sessions, departments, and classes.\n- **Security:** Manage roles, permissions, and system-wide settings.\n- **Backups:** Generate master reports and monitor system health.";
    }

    if (q.match(/librarian|library|books/)) {
        return "📚 **Library Management:**\n- **Inventory:** Librarians can manage the book catalog (add/edit books).\n- **Circulation:** Issue and return books to students using their Roll Numbers.\n- **Tracking:** Students can view their currently issued books and due dates from their profile.";
    }

    // Academic Structure
    if (q.match(/subject|course|syllabus/)) {
        return "📖 **Subject Management:**\n- Admins can create subjects and link them to specific departments.\n- Subjects are then assigned to classes (e.g., CS-101 has Mathematics, OS, and DBMS).\n- Faculty are then assigned to these subjects to mark attendance.";
    }

    if (q.match(/class|section|allocation/)) {
        return "🏫 **Class & Section Management:**\n- **Structure:** Classes are organized by Year (1st-4th) and Section (A, B, C).\n- **Allocation:** Admins use the 'Student Allocation' tool to move students into their respective classes.\n- **Timetable:** Each class has a dedicated timetable that dictates when attendance can be marked.";
    }

    // Account & Security
    if (q.match(/password|reset|security|login.*issue|access code|register|institutional email/)) {
        return "🔐 **Access & Registration:**\n- **Institutional Email:** Users must use an email ending in `@vemu.org` to register.\n- **Admin Access Code:** To register as an Admin, use the secret code **'5566'**.\n- **Login Issues:** If you can't log in, ensure your role (HOD/Teacher/Student) is selected correctly.\n- **Reset Password:** Admins can reset any user's password from the 'Manage Users' section.";
    }

    // Troubleshooting / Technical
    if (q.match(/error|bug|not working|failed|fix/)) {
        return "🛠️ **Troubleshooting:**\n1. **Refresh:** Try refreshing the page.\n2. **Cache:** Clear your browser cache if the UI looks outdated.\n3. **Network:** Ensure you have a stable internet connection.\n4. **Support:** If a specific feature (like 'Mark Attendance') fails, contact your Admin to check your assignments.";
    }

    // Appreciation / Closing
    if (q.match(/thanks|thank you|great|helpful|bye|goodbye/)) {
        return "You're very welcome! 😊 I'm always here to help you manage attendance more efficiently. Have a great day! 👋";
    }

    // Fallback
    return `🤔 I'm not entirely sure about that. Could you try rephrasing or asking about one of these topics?\n\n• **"How do I mark attendance?"**\n• **"What are the rules for low attendance?"**\n• **"How to download reports?"**\n• **"How can I apply for leave?"**\n• **"What can an HOD do?"**`;
};

const TypingIndicator = () => (
    <div style={{ display: 'flex', gap: '4px', padding: '12px 16px', alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
            <div key={i} style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#6c5ce7', opacity: 0.5,
                animation: `bounce 1.2s infinite ${i * 0.2}s`
            }} />
        ))}
        <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:0.5} 30%{transform:translateY(-6px);opacity:1} }`}</style>
    </div>
);

const formatMessage = (text) => {
    return text.split('\n').map((line, i) => (
        <span key={i}>
            {line.replace(/\*\*(.*?)\*\*/g, (m, p) => p).split(/\*\*(.*?)\*\*/).map((part, j) =>
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
            {i < text.split('\n').length - 1 && <br />}
        </span>
    ));
};

const ChatBot = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your **AMS Assistant** 🤖\nAsk me anything about attendance, reports, or how to use the system!", sender: 'bot', time: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const isDark = theme === 'dark';

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMsg = { id: Date.now(), text: trimmed, sender: 'user', time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking delay
        await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

        const botResponse = getSmartResponse(trimmed);
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot', time: new Date() }]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    const clearChat = () => {
        setMessages([{ id: 1, text: "Chat cleared! Hi again 👋 How can I help you with the Attendance Management System?", sender: 'bot', time: new Date() }]);
    };

    const suggestions = ["How do I mark attendance?", "How to download reports?", "What's my attendance shortage?", "How to apply for leave?"];

    const styles = {
        bubble: {
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            color: 'white', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', boxShadow: '0 4px 20px rgba(108,92,231,0.5)',
            transition: 'transform 0.3s ease',
        },
        window: {
            position: 'fixed', bottom: '90px', right: '24px', zIndex: 9999,
            width: '380px', height: '560px',
            background: isDark ? '#1e293b' : 'white',
            borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
            animation: 'slideUp 0.3s ease',
        },
        header: {
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            padding: '16px 20px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', color: 'white',
        },
        messagesArea: {
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '12px',
            background: isDark ? '#1e293b' : '#f8fafc',
        },
        userBubble: {
            alignSelf: 'flex-end', maxWidth: '75%',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            color: 'white', padding: '10px 14px', borderRadius: '18px 18px 4px 18px',
            fontSize: '14px', lineHeight: '1.5',
        },
        botBubble: {
            alignSelf: 'flex-start', maxWidth: '80%',
            background: isDark ? '#334155' : 'white',
            color: isDark ? '#f1f5f9' : '#1a1a2e',
            padding: '10px 14px', borderRadius: '18px 18px 18px 4px',
            fontSize: '14px', lineHeight: '1.5',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        },
        inputArea: {
            padding: '12px 16px', borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #eee',
            background: isDark ? '#1e293b' : 'white',
        },
        input: {
            width: '100%', padding: '10px 14px', borderRadius: '12px',
            border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e2e8f0',
            background: isDark ? '#334155' : '#f8fafc',
            color: isDark ? '#f1f5f9' : '#1a1a2e',
            fontSize: '14px', outline: 'none', resize: 'none',
            fontFamily: 'inherit',
        },
    };

    return (
        <>
            <style>{`
                @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
                .chat-bubble-btn:hover { transform: scale(1.1) !important; }
            `}</style>

            {/* Floating Chat Button */}
            <button className="chat-bubble-btn" onClick={() => setIsOpen(o => !o)} style={styles.bubble} title="Open AI Assistant">
                {isOpen ? <FiX /> : <FiMessageCircle />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div style={styles.window}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FiCpu size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '15px' }}>AMS Assistant</div>
                                <div style={{ fontSize: '11px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00b894', display: 'inline-block' }} />
                                    Online – Ready to help
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={clearChat} title="Clear Chat" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                                <FiTrash2 size={14} />
                            </button>
                            <button onClick={() => setIsOpen(false)} title="Close" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}>
                                <FiX size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={styles.messagesArea}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: msg.sender === 'user' ? '#6c5ce7' : (isDark ? '#475569' : '#e2e8f0'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {msg.sender === 'user' ? <FiUser size={14} color="white" /> : <FiCpu size={14} color={isDark ? '#a29bfe' : '#6c5ce7'} />}
                                    </div>
                                    <div style={msg.sender === 'user' ? styles.userBubble : styles.botBubble}>
                                        {formatMessage(msg.text)}
                                    </div>
                                </div>
                                <div style={{ fontSize: '10px', color: isDark ? '#64748b' : '#94a3b8', marginTop: '4px', paddingLeft: msg.sender === 'user' ? '0' : '34px', paddingRight: msg.sender === 'user' ? '34px' : '0' }}>
                                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? '#475569' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiCpu size={14} color="#6c5ce7" />
                                </div>
                                <div style={{ ...styles.botBubble, padding: '4px 8px' }}>
                                    <TypingIndicator />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    {messages.length <= 2 && (
                        <div style={{ padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f1f5f9', background: isDark ? '#1e293b' : 'white' }}>
                            {suggestions.map((s, i) => (
                                <button key={i} onClick={() => { setInput(s); inputRef.current?.focus(); }} style={{ background: isDark ? '#334155' : '#f1f5f9', color: isDark ? '#a29bfe' : '#6c5ce7', border: `1px solid ${isDark ? 'rgba(162,155,254,0.3)' : '#e2e8f0'}`, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div style={styles.inputArea}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask anything about attendance..."
                                rows={1}
                                style={{ ...styles.input, flex: 1 }}
                            />
                            <button onClick={sendMessage} disabled={!input.trim()} style={{ width: '40px', height: '40px', borderRadius: '12px', background: input.trim() ? 'linear-gradient(135deg, #6c5ce7, #a29bfe)' : '#e2e8f0', border: 'none', color: input.trim() ? 'white' : '#94a3b8', cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                                <FiSend size={18} />
                            </button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '11px', color: isDark ? '#475569' : '#94a3b8' }}>
                            Press Enter to send • Shift+Enter for new line
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
