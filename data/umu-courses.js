// ============================================
// UMU COURSES - COMPLETE TEMPLATE
// Based on folder structure from https://elearning.umu.ac.ug/course/
// ============================================

const COURSE_DATA = [];

// Helper function to add multiple placeholder courses
function addCourses(facultyId, facultyName, programId, programName, year, semester, baseCode, count) {
    for (let i = 1; i <= count; i++) {
        COURSE_DATA.push({
            facultyId,
            facultyName,
            programId,
            programName,
            year,
            semester,
            code: `${baseCode}${String(i).padStart(2, '0')}`,
            name: `${programName} Course ${i}`,  // Replace with actual names
            credits: 3
        });
    }
}

// ========== FACULTY OF AGRICULTURE (Nkozi Campus) ==========
const facAgri = 'fac_agri';
const facAgriName = 'Faculty of Agriculture';

// Postgraduate Programs
// PhD in Agroecology and Food Systems
addCourses(facAgri, facAgriName, 'phd_agro', 'PhD in Agroecology and Food Systems', 1, 1, 'PHD71', 4);
addCourses(facAgri, facAgriName, 'phd_agro', 'PhD in Agroecology and Food Systems', 1, 2, 'PHD72', 4);
addCourses(facAgri, facAgriName, 'phd_agro', 'PhD in Agroecology and Food Systems', 2, 1, 'PHD81', 3);
addCourses(facAgri, facAgriName, 'phd_agro', 'PhD in Agroecology and Food Systems', 2, 2, 'PHD82', 3);
addCourses(facAgri, facAgriName, 'phd_agro', 'PhD in Agroecology and Food Systems', 3, 1, 'PHD91', 2);
addCourses(facAgri, facAgriName, 'phd_agro', 'PhD in Agroecology and Food Systems', 3, 2, 'PHD92', 2);

// Master of Science in Monitoring and Evaluation
addCourses(facAgri, facAgriName, 'msc_me', 'Master of Science in Monitoring and Evaluation', 1, 1, 'MSC61', 4);
addCourses(facAgri, facAgriName, 'msc_me', 'Master of Science in Monitoring and Evaluation', 1, 2, 'MSC62', 4);
addCourses(facAgri, facAgriName, 'msc_me', 'Master of Science in Monitoring and Evaluation', 2, 1, 'MSC71', 3);
addCourses(facAgri, facAgriName, 'msc_me', 'Master of Science in Monitoring and Evaluation', 2, 2, 'MSC72', 3);

// Master of Science in Agribusiness and Innovations
addCourses(facAgri, facAgriName, 'msc_agribiz', 'Master of Science in Agribusiness and Innovations', 1, 1, 'AGB61', 4);
addCourses(facAgri, facAgriName, 'msc_agribiz', 'Master of Science in Agribusiness and Innovations', 1, 2, 'AGB62', 4);
addCourses(facAgri, facAgriName, 'msc_agribiz', 'Master of Science in Agribusiness and Innovations', 2, 1, 'AGB71', 3);
addCourses(facAgri, facAgriName, 'msc_agribiz', 'Master of Science in Agribusiness and Innovations', 2, 2, 'AGB72', 3);

// Master of Science in Agro-ecology
addCourses(facAgri, facAgriName, 'msc_agroeco', 'Master of Science in Agro-ecology', 1, 1, 'AEC61', 4);
addCourses(facAgri, facAgriName, 'msc_agroeco', 'Master of Science in Agro-ecology', 1, 2, 'AEC62', 4);
addCourses(facAgri, facAgriName, 'msc_agroeco', 'Master of Science in Agro-ecology', 2, 1, 'AEC71', 3);
addCourses(facAgri, facAgriName, 'msc_agroeco', 'Master of Science in Agro-ecology', 2, 2, 'AEC72', 3);

// Undergraduate Programs
// Bachelor of Agricultural Economics and Agri-business Management
addCourses(facAgri, facAgriName, 'bsc_agecon', 'Bachelor of Agricultural Economics and Agri-business Management', 1, 1, 'AGE11', 5);
addCourses(facAgri, facAgriName, 'bsc_agecon', 'Bachelor of Agricultural Economics and Agri-business Management', 1, 2, 'AGE12', 5);
addCourses(facAgri, facAgriName, 'bsc_agecon', 'Bachelor of Agricultural Economics and Agri-business Management', 2, 1, 'AGE21', 5);
addCourses(facAgri, facAgriName, 'bsc_agecon', 'Bachelor of Agricultural Economics and Agri-business Management', 2, 2, 'AGE22', 5);
addCourses(facAgri, facAgriName, 'bsc_agecon', 'Bachelor of Agricultural Economics and Agri-business Management', 3, 1, 'AGE31', 5);
addCourses(facAgri, facAgriName, 'bsc_agecon', 'Bachelor of Agricultural Economics and Agri-business Management', 3, 2, 'AGE32', 5);

// Bachelor of Agriculture
addCourses(facAgri, facAgriName, 'bsc_agri', 'Bachelor of Agriculture', 1, 1, 'AGR11', 5);
addCourses(facAgri, facAgriName, 'bsc_agri', 'Bachelor of Agriculture', 1, 2, 'AGR12', 5);
addCourses(facAgri, facAgriName, 'bsc_agri', 'Bachelor of Agriculture', 2, 1, 'AGR21', 5);
addCourses(facAgri, facAgriName, 'bsc_agri', 'Bachelor of Agriculture', 2, 2, 'AGR22', 5);
addCourses(facAgri, facAgriName, 'bsc_agri', 'Bachelor of Agriculture', 3, 1, 'AGR31', 5);
addCourses(facAgri, facAgriName, 'bsc_agri', 'Bachelor of Agriculture', 3, 2, 'AGR32', 5);

// Bachelor of Science in Agriculture
addCourses(facAgri, facAgriName, 'bsc_sci_agri', 'Bachelor of Science in Agriculture', 1, 1, 'SCA11', 5);
addCourses(facAgri, facAgriName, 'bsc_sci_agri', 'Bachelor of Science in Agriculture', 1, 2, 'SCA12', 5);
addCourses(facAgri, facAgriName, 'bsc_sci_agri', 'Bachelor of Science in Agriculture', 2, 1, 'SCA21', 5);
addCourses(facAgri, facAgriName, 'bsc_sci_agri', 'Bachelor of Science in Agriculture', 2, 2, 'SCA22', 5);
addCourses(facAgri, facAgriName, 'bsc_sci_agri', 'Bachelor of Science in Agriculture', 3, 1, 'SCA31', 5);
addCourses(facAgri, facAgriName, 'bsc_sci_agri', 'Bachelor of Science in Agriculture', 3, 2, 'SCA32', 5);

// Bachelor of Science in Agricultural Technology
addCourses(facAgri, facAgriName, 'bsc_agritech', 'Bachelor of Science in Agricultural Technology', 1, 1, 'AGT11', 5);
addCourses(facAgri, facAgriName, 'bsc_agritech', 'Bachelor of Science in Agricultural Technology', 1, 2, 'AGT12', 5);
addCourses(facAgri, facAgriName, 'bsc_agritech', 'Bachelor of Science in Agricultural Technology', 2, 1, 'AGT21', 5);
addCourses(facAgri, facAgriName, 'bsc_agritech', 'Bachelor of Science in Agricultural Technology', 2, 2, 'AGT22', 5);
addCourses(facAgri, facAgriName, 'bsc_agritech', 'Bachelor of Science in Agricultural Technology', 3, 1, 'AGT31', 5);
addCourses(facAgri, facAgriName, 'bsc_agritech', 'Bachelor of Science in Agricultural Technology', 3, 2, 'AGT32', 5);

// Bachelor of Science in Organic Agriculture
addCourses(facAgri, facAgriName, 'bsc_organic', 'Bachelor of Science in Organic Agriculture', 1, 1, 'ORG11', 5);
addCourses(facAgri, facAgriName, 'bsc_organic', 'Bachelor of Science in Organic Agriculture', 1, 2, 'ORG12', 5);
addCourses(facAgri, facAgriName, 'bsc_organic', 'Bachelor of Science in Organic Agriculture', 2, 1, 'ORG21', 5);
addCourses(facAgri, facAgriName, 'bsc_organic', 'Bachelor of Science in Organic Agriculture', 2, 2, 'ORG22', 5);
addCourses(facAgri, facAgriName, 'bsc_organic', 'Bachelor of Science in Organic Agriculture', 3, 1, 'ORG31', 5);
addCourses(facAgri, facAgriName, 'bsc_organic', 'Bachelor of Science in Organic Agriculture', 3, 2, 'ORG32', 5);

// Diploma in Agricultural Economics and Agribusiness Management
addCourses(facAgri, facAgriName, 'dip_agecon', 'Diploma in Agricultural Economics and Agribusiness Management', 1, 1, 'DAG11', 4);
addCourses(facAgri, facAgriName, 'dip_agecon', 'Diploma in Agricultural Economics and Agribusiness Management', 1, 2, 'DAG12', 4);
addCourses(facAgri, facAgriName, 'dip_agecon', 'Diploma in Agricultural Economics and Agribusiness Management', 2, 1, 'DAG21', 4);
addCourses(facAgri, facAgriName, 'dip_agecon', 'Diploma in Agricultural Economics and Agribusiness Management', 2, 2, 'DAG22', 4);

// ========== FACULTY OF BUSINESS ADMINISTRATION AND MANAGEMENT ==========
const facBus = 'fac_business';
const facBusName = 'Faculty of Business Administration and Management';

addCourses(facBus, facBusName, 'bba', 'Bachelor of Business Administration', 1, 1, 'BUS11', 5);
addCourses(facBus, facBusName, 'bba', 'Bachelor of Business Administration', 1, 2, 'BUS12', 5);
addCourses(facBus, facBusName, 'bba', 'Bachelor of Business Administration', 2, 1, 'BUS21', 5);
addCourses(facBus, facBusName, 'bba', 'Bachelor of Business Administration', 2, 2, 'BUS22', 5);
addCourses(facBus, facBusName, 'bba', 'Bachelor of Business Administration', 3, 1, 'BUS31', 5);
addCourses(facBus, facBusName, 'bba', 'Bachelor of Business Administration', 3, 2, 'BUS32', 5);

// (Add other programs like BBA, BCOM, etc. as needed)

// ========== FACULTY OF BUILT ENVIRONMENT ==========
const facBuilt = 'fac_built';
const facBuiltName = 'Faculty of Built Environment';

addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 1, 1, 'ARC11', 5);
addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 1, 2, 'ARC12', 5);
addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 2, 1, 'ARC21', 5);
addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 2, 2, 'ARC22', 5);
addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 3, 1, 'ARC31', 5);
addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 3, 2, 'ARC32', 5);
addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 4, 1, 'ARC41', 5);
addCourses(facBuilt, facBuiltName, 'barch', 'Bachelor of Architecture', 4, 2, 'ARC42', 5);

// ========== FACULTY OF EDUCATION ==========
const facEdu = 'fac_edu';
const facEduName = 'Faculty of Education';

addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 1, 1, 'EDU11', 5);
addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 1, 2, 'EDU12', 5);
addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 2, 1, 'EDU21', 5);
addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 2, 2, 'EDU22', 5);
addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 3, 1, 'EDU31', 5);
addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 3, 2, 'EDU32', 5);
addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 4, 1, 'EDU41', 5);
addCourses(facEdu, facEduName, 'ba_edu', 'Bachelor of Arts with Education', 4, 2, 'EDU42', 5);

addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 1, 1, 'SCI11', 5);
addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 1, 2, 'SCI12', 5);
addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 2, 1, 'SCI21', 5);
addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 2, 2, 'SCI22', 5);
addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 3, 1, 'SCI31', 5);
addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 3, 2, 'SCI32', 5);
addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 4, 1, 'SCI41', 5);
addCourses(facEdu, facEduName, 'bsc_edu', 'Bachelor of Science with Education', 4, 2, 'SCI42', 5);

// ========== FACULTY OF LAW ==========
const facLaw = 'fac_law';
const facLawName = 'Faculty of Law';

addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 1, 1, 'LAW11', 5);
addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 1, 2, 'LAW12', 5);
addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 2, 1, 'LAW21', 5);
addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 2, 2, 'LAW22', 5);
addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 3, 1, 'LAW31', 5);
addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 3, 2, 'LAW32', 5);
addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 4, 1, 'LAW41', 5);
addCourses(facLaw, facLawName, 'llb', 'Bachelor of Laws', 4, 2, 'LAW42', 5);

// ========== FACULTY OF SCIENCE ==========
const facSci = 'fac_sci';
const facSciName = 'Faculty of Science';

addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 1, 1, 'CS11', 5);
addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 1, 2, 'CS12', 5);
addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 2, 1, 'CS21', 5);
addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 2, 2, 'CS22', 5);
addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 3, 1, 'CS31', 5);
addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 3, 2, 'CS32', 5);
addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 4, 1, 'CS41', 5);
addCourses(facSci, facSciName, 'bsc_cs', 'Bachelor of Science in Computer Science', 4, 2, 'CS42', 5);

// ========== SCHOOL OF ARTS AND SOCIAL SCIENCES ==========
const facArts = 'fac_arts';
const facArtsName = 'School of Arts and Social Sciences';

addCourses(facArts, facArtsName, 'ba_arts', 'Bachelor of Arts', 1, 1, 'ART11', 5);
addCourses(facArts, facArtsName, 'ba_arts', 'Bachelor of Arts', 1, 2, 'ART12', 5);
addCourses(facArts, facArtsName, 'ba_arts', 'Bachelor of Arts', 2, 1, 'ART21', 5);
addCourses(facArts, facArtsName, 'ba_arts', 'Bachelor of Arts', 2, 2, 'ART22', 5);
addCourses(facArts, facArtsName, 'ba_arts', 'Bachelor of Arts', 3, 1, 'ART31', 5);
addCourses(facArts, facArtsName, 'ba_arts', 'Bachelor of Arts', 3, 2, 'ART32', 5);

// You can continue adding more faculties (e.g., Health Sciences, etc.) if needed.

// After building, COURSE_DATA will contain hundreds of placeholder entries.
// To replace placeholders with actual course names, you can:
// 1. Manually edit the 'name' fields in this file, or
// 2. Write a script to scrape the actual names from UMU's eLearning (if you have access).

console.log(`Generated ${COURSE_DATA.length} placeholder courses.`);