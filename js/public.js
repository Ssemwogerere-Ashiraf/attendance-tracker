// ============================================
// UMU ATTENDANCE SYSTEM - STUDENT PORTAL
// Separate JavaScript File
// ============================================

const studentPortal = {
    // State variables
    selectedFaculty: null,
    selectedStudyLevel: null,
    selectedProgram: null,
    selectedYear: null,
    selectedSemester: null,
    selectedCourseUnits: [],

    // Initialize the portal
    init: function() {
        this.updateCurrentDate();
        this.checkExistingSession();
    },

    // Update current date
    updateCurrentDate: function() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    },

    // Check if user is already logged in
    checkExistingSession: function() {
        if (currentUser) {
            this.goToStep5();
        }
    },

    // Navigation functions
    goToStep1: function() {
        document.getElementById('step1Card').style.display = 'block';
        document.getElementById('step2Card').style.display = 'none';
        document.getElementById('step3Card').style.display = 'none';
        document.getElementById('step4Card').style.display = 'none';
        document.getElementById('step5Card').style.display = 'none';
        this.updateStepIndicators(1);
    },

    goToStep2: function() {
        if (!this.validateStep1()) return;
        this.loadFaculties();
        document.getElementById('step1Card').style.display = 'none';
        document.getElementById('step2Card').style.display = 'block';
        this.updateStepIndicators(2);
    },

    goToStep3: function() {
        if (!this.validateStep2()) return;
        this.loadCourseUnits();
        document.getElementById('step2Card').style.display = 'none';
        document.getElementById('step3Card').style.display = 'block';
        this.updateStepIndicators(3);
    },

    goToStep4: function() {
        if (!this.validateStep3()) return;
        document.getElementById('step3Card').style.display = 'none';
        document.getElementById('step4Card').style.display = 'block';
        this.updateStepIndicators(4);
    },

    goToStep5: function() {
        document.getElementById('step4Card').style.display = 'none';
        document.getElementById('step5Card').style.display = 'block';
        this.updateStepIndicators(5);
        this.loadTodaysClasses();
        this.loadRecentAttendance();
    },

    updateStepIndicators: function(currentStep) {
        for (let i = 1; i <= 5; i++) {
            const step = document.getElementById(`step${i}`);
            if (i < currentStep) {
                step.className = 'step completed';
            } else if (i === currentStep) {
                step.className = 'step active';
            } else {
                step.className = 'step';
            }
        }
    },

    // Validation functions
    validateStep1: function() {
        const fields = ['fullName', 'regNumber', 'email', 'phone', 'password', 'confirmPassword'];
        for (const field of fields) {
            if (!document.getElementById(field).value.trim()) {
                showToast('Please fill in all fields', 'error');
                return false;
            }
        }
        
        const email = document.getElementById('email').value;
        if (!email.endsWith('@stud.umu.ac.ug')) {
            showToast('Please use your university email (@stud.umu.ac.ug)', 'error');
            return false;
        }
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return false;
        }
        
        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return false;
        }
        
        return true;
    },

    validateAndProceedToStep2: function() {
        if (this.validateStep1()) {
            this.goToStep2();
        }
    },

    validateStep2: function() {
        if (!this.selectedFaculty) {
            showToast('Please select a faculty', 'error');
            return false;
        }
        if (!this.selectedStudyLevel) {
            showToast('Please select your study level', 'error');
            return false;
        }
        if (!this.selectedProgram) {
            showToast('Please select your program', 'error');
            return false;
        }
        if (!this.selectedYear) {
            showToast('Please select your year of study', 'error');
            return false;
        }
        if (!this.selectedSemester) {
            showToast('Please select your semester', 'error');
            return false;
        }
        return true;
    },

    validateAndProceedToStep3: function() {
        if (this.validateStep2()) {
            this.goToStep3();
        }
    },

    validateStep3: function() {
        if (this.selectedCourseUnits.length === 0) {
            showToast('Please select at least one course unit', 'error');
            return false;
        }
        return true;
    },

    validateAndProceedToStep4: function() {
        if (this.validateStep3()) {
            this.goToStep4();
        }
    },

    // Load faculties
    loadFaculties: function() {
        const facultyList = document.getElementById('facultyList');
        facultyList.innerHTML = '';
        
        UNIVERSITY_DATA.faculties.forEach(faculty => {
            const card = document.createElement('div');
            card.className = `faculty-card ${this.selectedFaculty === faculty.id ? 'selected' : ''}`;
            card.innerHTML = `
                <div class="faculty-icon">
                    <i class="fas fa-university"></i>
                </div>
                <div class="faculty-name">${faculty.name}</div>
            `;
            card.onclick = () => {
                this.selectedFaculty = faculty.id;
                document.querySelectorAll('.faculty-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            };
            facultyList.appendChild(card);
        });
    },

    // Load programs
    loadPrograms: function() {
        const studyLevel = document.getElementById('studyLevel').value;
        this.selectedStudyLevel = studyLevel;
        
        if (!studyLevel) {
            document.getElementById('programSelection').style.display = 'none';
            return;
        }
        
        const programs = [...new Set(
            COURSE_DATA
                .filter(c => {
                    if (studyLevel === 'postgraduate') {
                        return c.programId.startsWith('phd') || c.programId.startsWith('msc');
                    } else {
                        return c.programId.startsWith('b') || c.programId.startsWith('dip');
                    }
                })
                .map(c => JSON.stringify({ id: c.programId, name: c.programName }))
        )].map(JSON.parse);
        
        const programSelect = document.getElementById('program');
        programSelect.innerHTML = '<option value="">Select program</option>';
        programs.sort((a, b) => a.name.localeCompare(b.name)).forEach(p => {
            programSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`;
        });
        
        document.getElementById('programSelection').style.display = 'block';
    },

    // Load program years
    loadProgramYears: function() {
        const programId = document.getElementById('program').value;
        this.selectedProgram = programId;
        
        if (!programId) {
            document.getElementById('yearSelection').style.display = 'none';
            return;
        }
        
        const years = [...new Set(
            COURSE_DATA.filter(c => c.programId === programId).map(c => c.year)
        )].sort((a, b) => a - b);
        
        const yearSelect = document.getElementById('year');
        yearSelect.innerHTML = '<option value="">Select year</option>';
        years.forEach(year => {
            yearSelect.innerHTML += `<option value="Year ${year}">Year ${year}</option>`;
        });
        
        document.getElementById('yearSelection').style.display = 'block';
    },

    // Load semesters
    loadSemesters: function() {
        const year = document.getElementById('year').value;
        this.selectedYear = year;
        
        if (!year) {
            document.getElementById('semesterSelection').style.display = 'none';
            return;
        }
        
        const yearNum = parseInt(year.replace('Year ', ''));
        const semesters = [...new Set(
            COURSE_DATA.filter(c => c.programId === this.selectedProgram && c.year === yearNum)
                .map(c => c.semester)
        )].sort((a, b) => a - b);
        
        const semesterSelect = document.getElementById('semester');
        semesterSelect.innerHTML = '<option value="">Select semester</option>';
        semesters.forEach(semester => {
            semesterSelect.innerHTML += `<option value="Semester ${semester}">Semester ${semester}</option>`;
        });
        
        document.getElementById('semesterSelection').style.display = 'block';
        
        semesterSelect.onchange = () => {
            this.selectedSemester = semesterSelect.value;
        };
    },

    // Load course units
    loadCourseUnits: function() {
        const courseUnitsList = document.getElementById('courseUnitsList');
        const yearNum = parseInt(this.selectedYear.replace('Year ', ''));
        const semesterNum = parseInt(this.selectedSemester.replace('Semester ', ''));
        
        const units = COURSE_DATA.filter(c => 
            c.programId === this.selectedProgram && 
            c.year === yearNum && 
            c.semester === semesterNum
        );
        
        if (units.length === 0) {
            courseUnitsList.innerHTML = '<p class="text-muted text-center">No course units available</p>';
            return;
        }
        
        courseUnitsList.innerHTML = '';
        units.forEach(unit => {
            const div = document.createElement('div');
            div.className = 'course-unit-item';
            div.innerHTML = `
                <input type="checkbox" class="course-unit-checkbox" 
                       value="${unit.code}" onchange="studentPortal.toggleCourseUnit('${unit.code}', ${unit.credits}, this)">
                <div class="course-unit-info">
                    <div class="course-unit-code">${unit.code}</div>
                    <div class="course-unit-name">${unit.name}</div>
                    <div class="course-unit-credits">${unit.credits} Credits</div>
                </div>
            `;
            courseUnitsList.appendChild(div);
        });
    },

    // Toggle course unit
    toggleCourseUnit: function(code, credits, checkbox) {
        if (checkbox.checked) {
            this.selectedCourseUnits.push({ code, credits });
        } else {
            this.selectedCourseUnits = this.selectedCourseUnits.filter(u => u.code !== code);
        }
        this.updateSelectedUnits();
    },

    // Update selected units
    updateSelectedUnits: function() {
        const selectedUnitsDiv = document.getElementById('selectedUnits');
        const totalCreditsSpan = document.getElementById('totalCredits');
        
        if (this.selectedCourseUnits.length === 0) {
            selectedUnitsDiv.innerHTML = '<p class="text-muted text-center small">No units selected</p>';
            totalCreditsSpan.textContent = '0';
            return;
        }
        
        let html = '';
        let totalCredits = 0;
        
        this.selectedCourseUnits.forEach(unit => {
            html += `
                <div class="d-flex justify-content-between align-items-center mb-2 small">
                    <span><strong>${unit.code}</strong></span>
                    <span class="badge bg-primary">${unit.credits} cr</span>
                </div>
            `;
            totalCredits += unit.credits;
        });
        
        selectedUnitsDiv.innerHTML = html;
        totalCreditsSpan.textContent = totalCredits;
    },

    // Photo preview
    previewPhoto: function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profilePreview').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },

    // Complete registration
    completeRegistration: async function() {
        try {
            const studentData = {
                name: document.getElementById('fullName').value.trim(),
                regNumber: document.getElementById('regNumber').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                password: document.getElementById('password').value,
                faculty: this.selectedFaculty,
                studyLevel: this.selectedStudyLevel,
                program: this.selectedProgram,
                year: this.selectedYear,
                semester: this.selectedSemester,
                courseUnits: this.selectedCourseUnits,
                profilePhoto: document.getElementById('profilePreview').src
            };
            
            const result = await registerStudent(studentData);
            
            if (result.success) {
                document.getElementById('qrCode').src = result.student.qrCode;
                showToast('Registration completed successfully!', 'success');
                currentUser = result.student;
                saveToStorage('currentUser', currentUser);
                setTimeout(() => this.goToStep5(), 2000);
            } else {
                showToast(result.error, 'error');
            }
        } catch (error) {
            showToast('Registration failed: ' + error.message, 'error');
        }
    },

    // Submit attendance code
    submitAttendanceCode: function() {
        const code = document.getElementById('attendanceCode').value.trim();
        
        if (!code || code.length !== 6) {
            showToast('Please enter a valid 6-digit code', 'error');
            return;
        }
        
        const session = attendanceSessions.find(s => s.oneTimeCode === code && s.active);
        
        if (!session) {
            showToast('Invalid or expired code', 'error');
            return;
        }
        
        const result = markAttendance(session.id, currentUser.id, 'code', code);
        
        if (result.success) {
            showToast(`Attendance marked: ${result.status}`, 'success');
            this.loadRecentAttendance();
            document.getElementById('attendanceCode').value = '';
        } else {
            showToast(result.error, 'error');
        }
    },

    // Load today's classes
    loadTodaysClasses: function() {
        const todayClassesDiv = document.getElementById('todayClasses');
        
        if (!currentUser || !currentUser.courseUnits || currentUser.courseUnits.length === 0) {
            todayClassesDiv.innerHTML = '<p class="text-muted text-center small">No classes scheduled</p>';
            return;
        }
        
        let html = '';
        currentUser.courseUnits.forEach(unit => {
            const courseInfo = COURSE_DATA.find(c => c.code === unit.code);
            html += `
                <div class="d-flex justify-content-between align-items-center p-2 border-bottom">
                    <div>
                        <strong>${unit.code}</strong>
                        <small class="text-muted d-block">${courseInfo?.name || 'Course'}</small>
                    </div>
                    <span class="badge bg-secondary">${courseInfo?.credits || 0} cr</span>
                </div>
            `;
        });
        
        todayClassesDiv.innerHTML = html || '<p class="text-muted text-center small">No classes scheduled</p>';
    },

    // Load recent attendance
    loadRecentAttendance: function() {
        const recentAttendanceDiv = document.getElementById('recentAttendance');
        
        if (!currentUser) {
            recentAttendanceDiv.innerHTML = '<p class="text-muted text-center small">No attendance records</p>';
            return;
        }
        
        const recentSessions = attendanceSessions
            .filter(s => s.attendees.some(a => a.studentId === currentUser.id))
            .sort((a, b) => b.startTime - a.startTime)
            .slice(0, 5);
        
        if (recentSessions.length === 0) {
            recentAttendanceDiv.innerHTML = '<p class="text-muted text-center small">No recent attendance</p>';
            return;
        }
        
        let html = '';
        recentSessions.forEach(session => {
            const attendance = session.attendees.find(a => a.studentId === currentUser.id);
            const date = new Date(session.startTime).toLocaleDateString();
            const courseInfo = COURSE_DATA.find(c => c.code === session.courseCode);
            
            html += `
                <div class="d-flex justify-content-between align-items-center p-2 border-bottom">
                    <div>
                        <strong>${session.courseCode}</strong>
                        <small class="text-muted d-block">${date}</small>
                    </div>
                    <span class="badge badge-${attendance.status}">${attendance.status}</span>
                </div>
            `;
        });
        
        recentAttendanceDiv.innerHTML = html;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    studentPortal.init();
});