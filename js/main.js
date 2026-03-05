// ============================================
// UMU ATTENDANCE MANAGEMENT SYSTEM
// Main JavaScript - Core Functionality
// ============================================

// Global variables
let currentUser = null;
let attendanceSessions = [];
let students = [];

// ===== THEME MANAGEMENT =====

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ===== UTILITY FUNCTIONS =====

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${getToastIcon(type)} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.querySelector('.toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Generate QR Code
async function generateQRCode(data) {
    try {
        const qrData = typeof data === 'string' ? data : JSON.stringify(data);
        return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;
    } catch (error) {
        console.error('QR Code generation error:', error);
        return null;
    }
}

// Generate one-time code
function generateOneTimeCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Generate session ID
function generateSessionId() {
    return `SESS${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

// Generate student ID
function generateStudentId() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `STU${year}${random}`;
}

// Validate student email
function validateStudentEmail(email) {
    const domain = '@stud.umu.ac.ug';
    return email.toLowerCase().endsWith(domain);
}

// Format date
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return {
        full: date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        date: date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        time: date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        timestamp: date.getTime()
    };
}

// Calculate attendance status
function calculateAttendanceStatus(sessionStartTime, signInTime, gracePeriod = 180000) {
    const timeDiff = signInTime - sessionStartTime;
    
    if (timeDiff < 0) return 'present';
    if (timeDiff <= gracePeriod) return 'present';
    if (timeDiff <= gracePeriod * 2) return 'late';
    return 'absent';
}

// ===== DATA STORAGE =====

function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Storage error:', error);
        return false;
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Load error:', error);
        return null;
    }
}

// Initialize app data
function initializeAppData() {
    students = loadFromStorage('students') || [];
    attendanceSessions = loadFromStorage('attendanceSessions') || [];
    currentUser = loadFromStorage('currentUser') || null;
}

// ===== STUDENT MANAGEMENT =====

async function registerStudent(studentData) {
    try {
        if (!validateStudentEmail(studentData.email)) {
            throw new Error('Invalid email. Must use @stud.umu.ac.ug domain');
        }
        
        const existingStudent = students.find(s => s.email === studentData.email);
        if (existingStudent) {
            throw new Error('Student with this email already exists');
        }
        
        const newStudent = {
            id: generateStudentId(),
            ...studentData,
            registrationDate: Date.now(),
            profilePhoto: studentData.profilePhoto || 'https://via.placeholder.com/150',
            qrCode: null,
            registeredUnits: studentData.courseUnits || []
        };
        
        newStudent.qrCode = await generateQRCode({
            id: newStudent.id,
            name: newStudent.name,
            regNumber: newStudent.regNumber,
            email: newStudent.email,
            faculty: newStudent.faculty,
            program: newStudent.program
        });
        
        students.push(newStudent);
        saveToStorage('students', students);
        
        return {
            success: true,
            student: newStudent,
            message: 'Registration successful!'
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// ===== ATTENDANCE MANAGEMENT =====

function createAttendanceSession(lecturerId, courseCode, method = 'code', duration = 15) {
    const session = {
        id: generateSessionId(),
        lecturerId,
        courseCode,
        startTime: Date.now(),
        duration: duration * 60000,
        method,
        oneTimeCode: method === 'code' ? generateOneTimeCode() : null,
        qrCode: null,
        attendees: [],
        active: true
    };
    
    attendanceSessions.push(session);
    saveToStorage('attendanceSessions', attendanceSessions);
    
    return session;
}

function markAttendance(sessionId, studentId, method = 'code', code = null) {
    const session = attendanceSessions.find(s => s.id === sessionId);
    
    if (!session) {
        return { success: false, error: 'Session not found' };
    }
    
    if (!session.active) {
        return { success: false, error: 'Session has expired' };
    }
    
    if (Date.now() > session.startTime + session.duration) {
        session.active = false;
        saveToStorage('attendanceSessions', attendanceSessions);
        return { success: false, error: 'Session has expired' };
    }
    
    if (method === 'code' && session.oneTimeCode !== code) {
        return { success: false, error: 'Invalid attendance code' };
    }
    
    const existingAttendance = session.attendees.find(a => a.studentId === studentId);
    if (existingAttendance) {
        return { success: false, error: 'Attendance already marked' };
    }
    
    const status = calculateAttendanceStatus(session.startTime, Date.now());
    
    const attendance = {
        studentId,
        timestamp: Date.now(),
        method,
        status
    };
    
    session.attendees.push(attendance);
    saveToStorage('attendanceSessions', attendanceSessions);
    
    return {
        success: true,
        attendance,
        status,
        message: `Attendance marked as ${status}`
    };
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initializeAppData();
});