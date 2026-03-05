// ============================================
// UMU ATTENDANCE SYSTEM - ADMIN PORTAL
// Complete JavaScript File
// ============================================

const adminPortal = {
    // State variables
    attendanceChart: null,

    // Initialize the admin portal
    init: function() {
        this.updateDashboardStats();
        this.loadFacultiesFilter();
        this.loadProgramsFilter();
        this.loadStudents();
        this.loadAttendanceSessions();
        this.loadSessionFaculties();
        this.initializeChart();
    },

    // Verify admin login
    verifyAdmin: function() {
        const password = document.getElementById('adminPassword').value;
        
        if (password === 'staff@umu2026') {
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            this.init();
            showToast('Login successful!', 'success');
        } else {
            showToast('Invalid password', 'error');
        }
    },

    // Logout admin
    logoutAdmin: function() {
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('adminPassword').value = '';
    },

    // Show tab
    showTab: function(tabName) {
        document.getElementById('studentsTab').style.display = 'none';
        document.getElementById('attendanceTab').style.display = 'none';
        document.getElementById('reportsTab').style.display = 'none';
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        document.getElementById(`${tabName}Tab`).style.display = 'block';
        event.target.classList.add('active');
        
        if (tabName === 'students') {
            this.loadStudents();
        } else if (tabName === 'attendance') {
            this.loadAttendanceSessions();
        } else if (tabName === 'reports') {
            this.updateChart();
        }
    },

    // Update dashboard statistics
    updateDashboardStats: function() {
        document.getElementById('totalStudents').textContent = students.length;
        
        const today = new Date().toDateString();
        const todaySessions = attendanceSessions.filter(s => 
            new Date(s.startTime).toDateString() === today
        );
        
        let presentToday = 0;
        let lateToday = 0;
        
        todaySessions.forEach(session => {
            session.attendees.forEach(attendance => {
                if (attendance.status === 'present') presentToday++;
                if (attendance.status === 'late') lateToday++;
            });
        });
        
        document.getElementById('presentToday').textContent = presentToday;
        document.getElementById('lateToday').textContent = lateToday;
        
        const activeSessions = attendanceSessions.filter(s => s.active).length;
        document.getElementById('totalSessions').textContent = activeSessions;
    },

    // Load students
    loadStudents: function() {
        const tbody = document.getElementById('studentsTableBody');
        
        if (students.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center">No students registered</td></tr>';
            return;
        }
        
        tbody.innerHTML = students.map(student => {
            const faculty = UNIVERSITY_DATA.faculties.find(f => f.id === student.faculty)?.name || 'N/A';
            const courses = student.courseUnits || [];
            const coursesHtml = courses.map(c => 
                `<span class="course-badge">${c.code}</span>`
            ).join('');
            
            return `
                <tr>
                    <td>
                        <img src="${student.profilePhoto || 'https://via.placeholder.com/40'}" 
                             class="student-photo" alt="Photo">
                    </td>
                    <td>${student.regNumber || 'N/A'}</td>
                    <td><strong>${student.name || 'N/A'}</strong></td>
                    <td>${student.email || 'N/A'}</td>
                    <td>${faculty}</td>
                    <td>${student.program || 'N/A'}</td>
                    <td>${student.year || 'N/A'} / ${student.semester || 'N/A'}</td>
                    <td><div style="max-width: 200px;">${coursesHtml || 'No courses'}</div></td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="adminPortal.viewStudentDetails('${student.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="adminPortal.viewStudentQR('${student.id}')">
                            <i class="fas fa-qrcode"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // View student details
    viewStudentDetails: function(studentId) {
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        
        const faculty = UNIVERSITY_DATA.faculties.find(f => f.id === student.faculty)?.name || 'N/A';
        
        let details = `STUDENT DETAILS\n`;
        details += `================\n\n`;
        details += `Name: ${student.name}\n`;
        details += `Registration Number: ${student.regNumber}\n`;
        details += `Email: ${student.email}\n`;
        details += `Phone: ${student.phone || 'N/A'}\n`;
        details += `Faculty: ${faculty}\n`;
        details += `Program: ${student.program || 'N/A'}\n`;
        details += `Year: ${student.year || 'N/A'}\n`;
        details += `Semester: ${student.semester || 'N/A'}\n\n`;
        details += `REGISTERED COURSES\n`;
        details += `==================\n`;
        
        student.courseUnits?.forEach(unit => {
            const courseInfo = COURSE_DATA.find(c => c.code === unit.code);
            details += `• ${unit.code} - ${courseInfo?.name || 'Unknown'} (${unit.credits} credits)\n`;
        });
        
        alert(details);
    },

    // View student QR code
    viewStudentQR: function(studentId) {
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        
        const qrWindow = window.open('', '_blank', 'width=400,height=500');
        qrWindow.document.write(`
            <html>
                <head>
                    <title>Student QR Code</title>
                    <style>
                        body { display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial; }
                        .container { text-align: center; }
                        img { max-width: 300px; border: 2px solid #333; padding: 10px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h3>${student.name}</h3>
                        <p>${student.regNumber}</p>
                        <img src="${student.qrCode}" alt="QR Code">
                        <p>Scan to mark attendance</p>
                    </div>
                </body>
            </html>
        `);
    },

    // Load faculties filter
    loadFacultiesFilter: function() {
        const filterSelect = document.getElementById('filterFaculty');
        UNIVERSITY_DATA.faculties.forEach(faculty => {
            filterSelect.innerHTML += `<option value="${faculty.id}">${faculty.name}</option>`;
        });
    },

    // Load programs filter
    loadProgramsFilter: function() {
        const programSelect = document.getElementById('filterProgram');
        const programs = new Set();
        
        students.forEach(student => {
            if (student.program) {
                programs.add(student.program);
            }
        });
        
        Array.from(programs).sort().forEach(program => {
            programSelect.innerHTML += `<option value="${program}">${program}</option>`;
        });
    },

    // Filter students
    filterStudents: function() {
        const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
        const facultyFilter = document.getElementById('filterFaculty').value;
        const programFilter = document.getElementById('filterProgram').value;
        
        const filteredStudents = students.filter(student => {
            const matchesSearch = (student.name?.toLowerCase().includes(searchTerm) ||
                                  student.regNumber?.toLowerCase().includes(searchTerm) ||
                                  student.email?.toLowerCase().includes(searchTerm));
            const matchesFaculty = !facultyFilter || student.faculty === facultyFilter;
            const matchesProgram = !programFilter || student.program === programFilter;
            
            return matchesSearch && matchesFaculty && matchesProgram;
        });
        
        this.displayFilteredStudents(filteredStudents);
    },

    // Display filtered students
    displayFilteredStudents: function(filteredStudents) {
        const tbody = document.getElementById('studentsTableBody');
        
        if (filteredStudents.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center">No students found</td></tr>';
            return;
        }
        
        tbody.innerHTML = filteredStudents.map(student => {
            const faculty = UNIVERSITY_DATA.faculties.find(f => f.id === student.faculty)?.name || 'N/A';
            const courses = student.courseUnits || [];
            const coursesHtml = courses.map(c => 
                `<span class="course-badge">${c.code}</span>`
            ).join('');
            
            return `
                <tr>
                    <td>
                        <img src="${student.profilePhoto || 'https://via.placeholder.com/40'}" 
                             class="student-photo" alt="Photo">
                    </td>
                    <td>${student.regNumber || 'N/A'}</td>
                    <td><strong>${student.name || 'N/A'}</strong></td>
                    <td>${student.email || 'N/A'}</td>
                    <td>${faculty}</td>
                    <td>${student.program || 'N/A'}</td>
                    <td>${student.year || 'N/A'} / ${student.semester || 'N/A'}</td>
                    <td><div style="max-width: 200px;">${coursesHtml || 'No courses'}</div></td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="adminPortal.viewStudentDetails('${student.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="adminPortal.viewStudentQR('${student.id}')">
                            <i class="fas fa-qrcode"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // Search students
    searchStudents: function() {
        this.filterStudents();
    },

    // Export students
    exportStudents: function() {
        const dataStr = JSON.stringify(students, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `students_${new Date().toISOString().slice(0,10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showToast('Students exported successfully', 'success');
    },

    // Load attendance sessions
    loadAttendanceSessions: function() {
        const tbody = document.getElementById('attendanceTableBody');
        
        if (attendanceSessions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center">No attendance sessions</td></tr>';
            return;
        }
        
        tbody.innerHTML = attendanceSessions.map(session => {
            const startTime = new Date(session.startTime);
            const isActive = session.active && Date.now() < session.startTime + session.duration;
            
            return `
                <tr>
                    <td><small>${session.id}</small></td>
                    <td><strong>${session.courseCode}</strong></td>
                    <td>${startTime.toLocaleString()}</td>
                    <td>${session.duration / 60000} min</td>
                    <td><span class="badge bg-info">${session.method}</span></td>
                    <td>
                        ${session.method === 'code' 
                            ? `<code>${session.oneTimeCode}</code>` 
                            : '<i class="fas fa-qrcode text-primary"></i>'}
                    </td>
                    <td>${session.attendees.length}</td>
                    <td>
                        <span class="badge ${isActive ? 'badge-active' : 'badge-expired'}">
                            ${isActive ? 'Active' : 'Expired'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="adminPortal.viewSession('${session.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="adminPortal.endSession('${session.id}')">
                            <i class="fas fa-stop"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // Load session faculties
    loadSessionFaculties: function() {
        const facultySelect = document.getElementById('sessionFaculty');
        UNIVERSITY_DATA.faculties.forEach(faculty => {
            facultySelect.innerHTML += `<option value="${faculty.id}">${faculty.name}</option>`;
        });
    },

    // Load session programs
    loadSessionPrograms: function() {
        const facultyId = document.getElementById('sessionFaculty').value;
        const programSelect = document.getElementById('sessionProgram');
        
        programSelect.innerHTML = '<option value="">Select Program</option>';
        
        if (!facultyId) return;
        
        const programs = [...new Set(
            COURSE_DATA.filter(c => c.facultyId === facultyId)
                .map(c => JSON.stringify({ id: c.programId, name: c.programName }))
        )].map(JSON.parse);
        
        programs.sort((a, b) => a.name.localeCompare(b.name)).forEach(program => {
            programSelect.innerHTML += `<option value="${program.id}">${program.name}</option>`;
        });
    },

    // Load session years
    loadSessionYears: function() {
        const programId = document.getElementById('sessionProgram').value;
        const yearSelect = document.getElementById('sessionYear');
        
        yearSelect.innerHTML = '<option value="">Select Year</option>';
        
        if (!programId) return;
        
        const years = [...new Set(
            COURSE_DATA.filter(c => c.programId === programId).map(c => c.year)
        )].sort((a, b) => a - b);
        
        years.forEach(year => {
            yearSelect.innerHTML += `<option value="Year ${year}">Year ${year}</option>`;
        });
    },

    // Load session semesters
    loadSessionSemesters: function() {
        const programId = document.getElementById('sessionProgram').value;
        const year = document.getElementById('sessionYear').value;
        const semesterSelect = document.getElementById('sessionSemester');
        
        semesterSelect.innerHTML = '<option value="">Select Semester</option>';
        
        if (!programId || !year) return;
        
        const yearNum = parseInt(year.replace('Year ', ''));
        const semesters = [...new Set(
            COURSE_DATA.filter(c => c.programId === programId && c.year === yearNum)
                .map(c => c.semester)
        )].sort((a, b) => a - b);
        
        semesters.forEach(semester => {
            semesterSelect.innerHTML += `<option value="Semester ${semester}">Semester ${semester}</option>`;
        });
    },

    // Load session courses
    loadSessionCourses: function() {
        const programId = document.getElementById('sessionProgram').value;
        const year = document.getElementById('sessionYear').value;
        const semester = document.getElementById('sessionSemester').value;
        const courseSelect = document.getElementById('sessionCourse');
        const filterSelect = document.getElementById('filterCourseAttendance');
        
        courseSelect.innerHTML = '<option value="">Select Course Unit</option>';
        
        if (!programId || !year || !semester) return;
        
        const yearNum = parseInt(year.replace('Year ', ''));
        const semesterNum = parseInt(semester.replace('Semester ', ''));
        
        const courses = COURSE_DATA.filter(c => 
            c.programId === programId && 
            c.year === yearNum && 
            c.semester === semesterNum
        );
        
        courses.forEach(course => {
            courseSelect.innerHTML += `<option value="${course.code}">${course.code} - ${course.name} (${course.credits} credits)</option>`;
        });
        
        // Populate filter dropdown with all courses (only once)
        if (filterSelect.options.length <= 1) {
            filterSelect.innerHTML = '<option value="">All Courses</option>';
            const allCourses = [...new Set(COURSE_DATA.map(c => c.code))].sort();
            allCourses.forEach(code => {
                const course = COURSE_DATA.find(c => c.code === code);
                filterSelect.innerHTML += `<option value="${code}">${code} - ${course?.name || ''}</option>`;
            });
        }
    },

    // Toggle attendance method
    toggleAttendanceMethod: function() {
        const method = document.getElementById('sessionMethod').value;
        
        if (method === 'code') {
            document.getElementById('codeSection').style.display = 'block';
            document.getElementById('qrSection').style.display = 'none';
            this.generateNewCode();
        } else {
            document.getElementById('codeSection').style.display = 'none';
            document.getElementById('qrSection').style.display = 'block';
            this.generateQRCode();
        }
    },

    // Generate new code
    generateNewCode: function() {
        document.getElementById('generatedCode').value = generateOneTimeCode();
    },

    // Generate QR code
    generateQRCode: function() {
        const course = document.getElementById('sessionCourse').value;
        const duration = document.getElementById('sessionDuration').value;
        const sessionId = generateSessionId();
        
        const qrData = {
            sessionId: sessionId,
            course: course,
            timestamp: Date.now(),
            duration: duration,
            type: 'attendance'
        };
        
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(JSON.stringify(qrData))}`;
        document.getElementById('qrCodeImage').src = qrUrl;
    },

    // Download QR code
    downloadQRCode: function() {
        const link = document.createElement('a');
        link.download = `attendance-${Date.now()}.png`;
        link.href = document.getElementById('qrCodeImage').src;
        link.click();
    },

    // Show create session modal
    showCreateSessionModal: function() {
        this.generateNewCode();
        new bootstrap.Modal(document.getElementById('createSessionModal')).show();
    },

    // Create attendance session
    createAttendanceSession: function() {
        const course = document.getElementById('sessionCourse').value;
        const duration = parseInt(document.getElementById('sessionDuration').value);
        const method = document.getElementById('sessionMethod').value;
        const code = document.getElementById('generatedCode').value;
        
        if (!course) {
            showToast('Please select a course', 'error');
            return;
        }
        
        const session = {
            id: generateSessionId(),
            lecturerId: 'ADMIN001',
            courseCode: course,
            startTime: Date.now(),
            duration: duration * 60000,
            method: method,
            oneTimeCode: code,
            attendees: [],
            active: true
        };
        
        attendanceSessions.push(session);
        saveToStorage('attendanceSessions', attendanceSessions);
        
        bootstrap.Modal.getInstance(document.getElementById('createSessionModal')).hide();
        
        this.loadAttendanceSessions();
        this.updateDashboardStats();
        
        showToast('Attendance session created successfully', 'success');
    },

    // Filter attendance
    filterAttendance: function() {
        const courseFilter = document.getElementById('filterCourseAttendance').value;
        const dateFilter = document.getElementById('filterDate').value;
        const statusFilter = document.getElementById('filterStatus').value;
        
        const filteredSessions = attendanceSessions.filter(session => {
            const matchesCourse = !courseFilter || session.courseCode === courseFilter;
            const matchesDate = !dateFilter || 
                new Date(session.startTime).toISOString().slice(0,10) === dateFilter;
            const isActive = session.active && Date.now() < session.startTime + session.duration;
            const matchesStatus = !statusFilter || 
                (statusFilter === 'active' ? isActive : !isActive);
            
            return matchesCourse && matchesDate && matchesStatus;
        });
        
        this.displayFilteredSessions(filteredSessions);
    },

    // Display filtered sessions
    displayFilteredSessions: function(sessions) {
        const tbody = document.getElementById('attendanceTableBody');
        
        if (sessions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center">No sessions found</td></tr>';
            return;
        }
        
        tbody.innerHTML = sessions.map(session => {
            const startTime = new Date(session.startTime);
            const isActive = session.active && Date.now() < session.startTime + session.duration;
            
            return `
                <tr>
                    <td><small>${session.id}</small></td>
                    <td><strong>${session.courseCode}</strong></td>
                    <td>${startTime.toLocaleString()}</td>
                    <td>${session.duration / 60000} min</td>
                    <td><span class="badge bg-info">${session.method}</span></td>
                    <td>
                        ${session.method === 'code' 
                            ? `<code>${session.oneTimeCode}</code>` 
                            : '<i class="fas fa-qrcode text-primary"></i>'}
                    </td>
                    <td>${session.attendees.length}</td>
                    <td>
                        <span class="badge ${isActive ? 'badge-active' : 'badge-expired'}">
                            ${isActive ? 'Active' : 'Expired'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="adminPortal.viewSession('${session.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="adminPortal.endSession('${session.id}')">
                            <i class="fas fa-stop"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // View session details
    viewSession: function(sessionId) {
        const session = attendanceSessions.find(s => s.id === sessionId);
        if (!session) return;
        
        const modal = new bootstrap.Modal(document.getElementById('viewSessionModal'));
        const detailsDiv = document.getElementById('sessionDetails');
        const listBody = document.getElementById('attendanceListBody');
        
        const startTime = new Date(session.startTime);
        const endTime = new Date(session.startTime + session.duration);
        
        detailsDiv.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Session ID:</strong> ${session.id}</p>
                    <p><strong>Course:</strong> ${session.courseCode}</p>
                    <p><strong>Method:</strong> ${session.method}</p>
                    <p><strong>Code:</strong> ${session.oneTimeCode || 'QR Code'}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Start Time:</strong> ${startTime.toLocaleString()}</p>
                    <p><strong>End Time:</strong> ${endTime.toLocaleString()}</p>
                    <p><strong>Duration:</strong> ${session.duration / 60000} minutes</p>
                    <p><strong>Total Attendees:</strong> ${session.attendees.length}</p>
                </div>
            </div>
        `;
        
        if (session.attendees.length === 0) {
            listBody.innerHTML = '<tr><td colspan="4" class="text-center">No attendees yet</td></tr>';
        } else {
            listBody.innerHTML = session.attendees.map(attendance => {
                const student = students.find(s => s.id === attendance.studentId);
                const time = new Date(attendance.timestamp).toLocaleTimeString();
                
                return `
                    <tr>
                        <td>${student?.name || 'Unknown'}</td>
                        <td>${student?.regNumber || 'N/A'}</td>
                        <td>${time}</td>
                        <td><span class="badge badge-${attendance.status}">${attendance.status}</span></td>
                    </tr>
                `;
            }).join('');
        }
        
        modal.show();
    },

    // End session
    endSession: function(sessionId) {
        if (confirm('End this attendance session?')) {
            const session = attendanceSessions.find(s => s.id === sessionId);
            if (session) {
                session.active = false;
                saveToStorage('attendanceSessions', attendanceSessions);
                this.loadAttendanceSessions();
                this.updateDashboardStats();
                showToast('Session ended', 'success');
            }
        }
    },

    // Initialize chart
    initializeChart: function() {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        this.attendanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Present',
                        data: [],
                        backgroundColor: '#27ae60'
                    },
                    {
                        label: 'Late',
                        data: [],
                        backgroundColor: '#f39c12'
                    },
                    {
                        label: 'Absent',
                        data: [],
                        backgroundColor: '#e74c3c'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    // Update chart
    updateChart: function() {
        if (!this.attendanceChart) return;
        
        const courseStats = {};
        
        attendanceSessions.forEach(session => {
            if (!courseStats[session.courseCode]) {
                courseStats[session.courseCode] = { present: 0, late: 0, absent: 0 };
            }
            
            session.attendees.forEach(attendance => {
                courseStats[session.courseCode][attendance.status]++;
            });
        });
        
        this.attendanceChart.data.labels = Object.keys(courseStats);
        this.attendanceChart.data.datasets[0].data = Object.values(courseStats).map(s => s.present);
        this.attendanceChart.data.datasets[1].data = Object.values(courseStats).map(s => s.late);
        this.attendanceChart.data.datasets[2].data = Object.values(courseStats).map(s => s.absent);
        
        this.attendanceChart.update();
    },

    // Generate report
    generateReport: function(type) {
        let reportData;
        
        switch(type) {
            case 'daily':
                reportData = this.generateDailyReport();
                break;
            case 'weekly':
                reportData = this.generateWeeklyReport();
                break;
            case 'monthly':
                reportData = this.generateMonthlyReport();
                break;
            case 'course':
                reportData = this.generateCourseReport();
                break;
            case 'student':
                reportData = this.generateStudentReport();
                break;
        }
        
        this.displayReport(reportData);
    },

    // Generate daily report
    generateDailyReport: function() {
        const today = new Date().toDateString();
        const todaySessions = attendanceSessions.filter(s => 
            new Date(s.startTime).toDateString() === today
        );
        
        let totalPresent = 0;
        let totalLate = 0;
        let totalAbsent = 0;
        
        todaySessions.forEach(session => {
            session.attendees.forEach(attendance => {
                if (attendance.status === 'present') totalPresent++;
                else if (attendance.status === 'late') totalLate++;
                else if (attendance.status === 'absent') totalAbsent++;
            });
        });
        
        return {
            title: 'DAILY ATTENDANCE REPORT',
            date: new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            totalSessions: todaySessions.length,
            present: totalPresent,
            late: totalLate,
            absent: totalAbsent,
            total: totalPresent + totalLate + totalAbsent
        };
    },

    // Generate weekly report
    generateWeeklyReport: function() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const weekSessions = attendanceSessions.filter(s => s.startTime >= oneWeekAgo.getTime());
        
        let totalPresent = 0;
        let totalLate = 0;
        let totalAbsent = 0;
        
        weekSessions.forEach(session => {
            session.attendees.forEach(attendance => {
                if (attendance.status === 'present') totalPresent++;
                else if (attendance.status === 'late') totalLate++;
                else if (attendance.status === 'absent') totalAbsent++;
            });
        });
        
        return {
            title: 'WEEKLY ATTENDANCE REPORT',
            period: `Last 7 days (${oneWeekAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()})`,
            totalSessions: weekSessions.length,
            present: totalPresent,
            late: totalLate,
            absent: totalAbsent,
            total: totalPresent + totalLate + totalAbsent
        };
    },

    // Generate monthly report
    generateMonthlyReport: function() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        const monthSessions = attendanceSessions.filter(s => s.startTime >= oneMonthAgo.getTime());
        
        let totalPresent = 0;
        let totalLate = 0;
        let totalAbsent = 0;
        
        monthSessions.forEach(session => {
            session.attendees.forEach(attendance => {
                if (attendance.status === 'present') totalPresent++;
                else if (attendance.status === 'late') totalLate++;
                else if (attendance.status === 'absent') totalAbsent++;
            });
        });
        
        return {
            title: 'MONTHLY ATTENDANCE REPORT',
            period: `Last 30 days (${oneMonthAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()})`,
            totalSessions: monthSessions.length,
            present: totalPresent,
            late: totalLate,
            absent: totalAbsent,
            total: totalPresent + totalLate + totalAbsent
        };
    },

    // Generate course report
    generateCourseReport: function() {
        const courseStats = {};
        
        attendanceSessions.forEach(session => {
            if (!courseStats[session.courseCode]) {
                courseStats[session.courseCode] = { 
                    present: 0, 
                    late: 0, 
                    absent: 0,
                    sessions: 0
                };
            }
            courseStats[session.courseCode].sessions++;
            
            session.attendees.forEach(attendance => {
                courseStats[session.courseCode][attendance.status]++;
            });
        });
        
        return {
            title: 'COURSE-WISE ATTENDANCE REPORT',
            courses: courseStats
        };
    },

    // Generate student report
    generateStudentReport: function() {
        const studentStats = {};
        
        students.forEach(student => {
            studentStats[student.id] = {
                name: student.name,
                regNumber: student.regNumber,
                present: 0,
                late: 0,
                absent: 0,
                total: 0
            };
        });
        
        attendanceSessions.forEach(session => {
            session.attendees.forEach(attendance => {
                if (studentStats[attendance.studentId]) {
                    studentStats[attendance.studentId][attendance.status]++;
                    studentStats[attendance.studentId].total++;
                }
            });
        });
        
        return {
            title: 'STUDENT ATTENDANCE REPORT',
            students: studentStats
        };
    },

    // Display report
    displayReport: function(reportData) {
        let message = `${reportData.title}\n`;
        message += '='.repeat(reportData.title.length) + '\n\n';
        
        if (reportData.date) message += `Date: ${reportData.date}\n`;
        if (reportData.period) message += `Period: ${reportData.period}\n`;
        message += `Total Sessions: ${reportData.totalSessions}\n`;
        message += `Total Attendance Records: ${reportData.total}\n\n`;
        
        if (reportData.courses) {
            message += 'COURSE BREAKDOWN\n';
            message += '----------------\n';
            for (const [course, stats] of Object.entries(reportData.courses)) {
                const courseInfo = COURSE_DATA.find(c => c.code === course);
                message += `\n${course} - ${courseInfo?.name || 'Unknown'}\n`;
                message += `  Sessions: ${stats.sessions}\n`;
                message += `  Present: ${stats.present}\n`;
                message += `  Late: ${stats.late}\n`;
                message += `  Absent: ${stats.absent}\n`;
                const totalAttended = stats.present + stats.late + stats.absent;
                message += `  Attendance Rate: ${totalAttended ? ((stats.present + stats.late) / totalAttended * 100).toFixed(1) : 0}%\n`;
            }
        } else if (reportData.students) {
            message += 'STUDENT BREAKDOWN\n';
            message += '-----------------\n';
            for (const [id, stats] of Object.entries(reportData.students)) {
                if (stats.total > 0) {
                    message += `\n${stats.name} (${stats.regNumber})\n`;
                    message += `  Present: ${stats.present}\n`;
                    message += `  Late: ${stats.late}\n`;
                    message += `  Absent: ${stats.absent}\n`;
                    message += `  Attendance Rate: ${((stats.present + stats.late) / stats.total * 100).toFixed(1)}%\n`;
                }
            }
        } else {
            message += `Present: ${reportData.present}\n`;
            message += `Late: ${reportData.late}\n`;
            message += `Absent: ${reportData.absent}\n\n`;
            
            if (reportData.total > 0) {
                message += `Present Rate: ${((reportData.present / reportData.total) * 100).toFixed(1)}%\n`;
                message += `Late Rate: ${((reportData.late / reportData.total) * 100).toFixed(1)}%\n`;
                message += `Absent Rate: ${((reportData.absent / reportData.total) * 100).toFixed(1)}%`;
            }
        }
        
        // Create a new window for the report
        const reportWindow = window.open('', '_blank', 'width=800,height=600');
        reportWindow.document.write(`
            <html>
                <head>
                    <title>${reportData.title}</title>
                    <style>
                        body { font-family: 'Courier New', monospace; padding: 40px; line-height: 1.6; }
                        pre { white-space: pre-wrap; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <pre>${message}</pre>
                    <button onclick="window.print()" style="position: fixed; bottom: 20px; right: 20px; padding: 10px 20px;">
                        Print Report
                    </button>
                </body>
            </html>
        `);
    }
};

// Initialize when DOM is ready (but only after login)
document.addEventListener('DOMContentLoaded', () => {
    // Nothing here; initialization happens after login
});