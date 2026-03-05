// ============================================
// SAMPLE DATA FOR UMU ATTENDANCE SYSTEM
// ============================================

const UNIVERSITY_DATA = {
    // Faculties from screenshot 1
    faculties: [
        { id: 'fac_agri', name: 'Faculty of Agriculture' },
        { id: 'fac_business', name: 'Faculty of Business Administration and Management' },
        { id: 'fac_built', name: 'Faculty of Built Environment' },
        { id: 'fac_edu', name: 'Faculty of Education' },
        { id: 'fac_law', name: 'Faculty of Law' },
        { id: 'fac_sci', name: 'Faculty of Science' },
        { id: 'fac_arts', name: 'School of Arts and Social Sciences' }
    ],

    // Study levels from screenshot 2
    studyLevels: {
        postgraduate: {
            name: 'Postgraduate',
            academicYear: '2025/26',
            programs: [
                { id: 'phd_agro', name: 'PhD in Agroecology and Food Systems' },
                { id: 'msc_me', name: 'Master of Science in Monitoring and Evaluation' },
                { id: 'msc_agribiz', name: 'Master of Science in Agribusiness and Innovations' },
                { id: 'msc_agroeco', name: 'Master of Science in Agro-ecology' }
            ]
        },
        undergraduate: {
            name: 'Undergraduate',
            academicYear: '2025/26',
            programs: [
                { id: 'ba_edu', name: 'Bachelor of Arts with Education' },
                { id: 'bsc_edu', name: 'Bachelor of Science with Education' },
                { id: 'bsc_cs', name: 'Bachelor of Science in Computer Science' },
                { id: 'bba', name: 'Bachelor of Business Administration' },
                { id: 'bsc_agecon', name: 'Bachelor of Agricultural Economics and Agri-business Management' },
                { id: 'bsc_agri', name: 'Bachelor of Agriculture' },
                { id: 'bsc_sci_agri', name: 'Bachelor of Science in Agriculture' },
                { id: 'bsc_agritech', name: 'Bachelor of Science in Agricultural Technology' },
                { id: 'bsc_organic', name: 'Bachelor of Science in Organic Agriculture' },
                { id: 'dip_agecon', name: 'Diploma in Agricultural Economics and Agribusiness Management' }
            ]
        }
    },

    // Student email domain
    emailDomain: '@stud.umu.ac.ug'
};

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UNIVERSITY_DATA;
}