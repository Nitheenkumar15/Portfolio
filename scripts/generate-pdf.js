const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    margin: 35, // Reduced margin to fit on one page
    size: 'A4',
    info: {
        Title: 'Nitheenkumar_P_Resume',
        Author: 'Nitheenkumar P',
        Keywords: 'Frontend Developer, Software Engineer, React.js, Node.js, JavaScript, MySQL, Web Development, REST APIs, Agile',
        Subject: 'Resume of Nitheenkumar P'
    }
});
doc.pipe(fs.createWriteStream('public/resume.pdf'));

// ATS-friendly Section Header
const drawHeader = (text) => {
    doc.moveDown(0.3); // Reduced from 0.5
    doc.font('Helvetica-Bold').fontSize(14).fillColor('#000000').text(text.toUpperCase());
    // Adjusted line width for new margins (A4 width 595 - 2*35 = 525)
    doc.moveTo(doc.x, doc.y).lineTo(doc.x + 525, doc.y).strokeColor('#000000').lineWidth(1).stroke();
    doc.moveDown(0.2); // Reduced from 0.4
};

// --- HEADER SECTION ---
doc.font('Helvetica-Bold').fontSize(24).fillColor('#000000').text('NITHEENKUMAR P', { align: 'center' });
doc.moveDown(0.1);

doc.font('Helvetica').fontSize(11).text('Madurai, Tamil Nadu • +91 7094998196 • nitheenkumar18@gmail.com', { align: 'center' });
doc.text('portfolio-navy-pi-87.vercel.app • linkedin.com/in/nitheenkumar15 • github.com/Nitheenkumar15', { align: 'center' });
doc.moveDown(0.1);

// --- PROFESSIONAL SUMMARY ---
drawHeader('Professional Summary');
doc.font('Helvetica').fontSize(11).text(
    'Results-driven Frontend Developer with expertise in designing, developing, and deploying scalable web applications using modern JavaScript, React.js, and Node.js. Adept at engineering robust RESTful APIs, architecting optimal database schemas in MySQL, and building responsive, mobile-first user interfaces. Passionate about software architecture, optimizing application performance, and delivering high-quality user experiences in agile software development environments.',
    { align: 'justify' }
);

// --- TECHNICAL SKILLS ---
drawHeader('Technical Skills');
const technicalSkills = [
    { category: 'Frontend', skills: 'HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Responsive UI' },
    { category: 'Backend', skills: 'Node.js, Express.js, RESTful APIs, Authentication (Bcrypt)' },
    { category: 'Database', skills: 'MySQL, Relational Database Design, Data Modeling' },
    { category: 'Tools & Workflows', skills: 'Git, GitHub, VS Code' }
];

technicalSkills.forEach(item => {
    doc.font('Helvetica-Bold').fontSize(11).text(`${item.category}: `, { continued: true });
    doc.font('Helvetica').text(item.skills);
});

// --- PROFESSIONAL EXPERIENCE ---
drawHeader('Professional Experience');
doc.font('Helvetica-Bold').fontSize(12).text('Frontend Developer Intern');
doc.font('Helvetica-Bold').fontSize(11).text('WilTeck', { continued: true });
doc.font('Helvetica').text(' | Madurai, Tamil Nadu | ', { continued: true });
doc.font('Helvetica-Oblique').text('May 2023 - Jun 2023');
doc.moveDown(0.1);
const internPoints = [
    'Spearheaded the development of dynamic and responsive user interface components utilizing HTML, CSS, and modern JavaScript, leading to enhanced user engagement.',
    'Identified, debugged, and resolved complex cross-browser compatibility issues, enhancing overall system reliability and User Experience (UX).',
    'Collaborated effectively within an agile team framework utilizing Git and GitHub for seamless version control and CI/CD pipelines.',
    'Assisted in back-end system integration and optimized MySQL database operations for streamlined application performance.'
];
internPoints.forEach(point => {
    doc.font('Helvetica').text(`•  ${point}`, { indent: 15, align: 'justify' });
});

// --- PROJECTS ---
drawHeader('Projects');
doc.font('Helvetica-Bold').fontSize(12).text('AAC Alumni Management System');
doc.font('Helvetica-Bold').fontSize(11).text('Technologies Used:', { continued: true });
doc.font('Helvetica').text(' React.js, Node.js, Express.js, MySQL, REST API | ', { continued: true });
doc.font('Helvetica-Oblique').text('coe.aactni.edu.in/apr26/24MCA514/');
doc.moveDown(0.1);
const projectPoints1 = [
    'Architected and deployed a comprehensive full-stack platform facilitating user registration, profile management, and network communication for college alumni.',
    'Engineered secure, scalable RESTful APIs using Node.js and Express.js to interface seamlessly with a normalized MySQL database.',
    'Implemented state management and dynamic routing using React.js to deliver a seamless Single Page Application (SPA) experience.',
    'Optimized database queries and backend logic, resulting in highly efficient data retrieval and robust application scalability.'
];
projectPoints1.forEach(point => {
    doc.font('Helvetica').text(`•  ${point}`, { indent: 15, align: 'justify' });
});

// --- EDUCATION ---
drawHeader('Education');
doc.font('Helvetica-Bold').fontSize(12).text('Master of Computer Applications (MCA)');
doc.font('Helvetica-Bold').fontSize(11).text('Arul Anandar College (Autonomous), Madurai Kamaraj University', { continued: true });
doc.font('Helvetica').text(' | 2024 - 2026');
doc.font('Helvetica').text('Cumulative Score: 78% CGPA');
doc.moveDown(0.2);

doc.font('Helvetica-Bold').fontSize(12).text('Bachelor of Science (B.Sc.) in Computer Science');
doc.font('Helvetica-Bold').fontSize(11).text('Meenakshi Ammal Arts and Science College, University of Madras', { continued: true });
doc.font('Helvetica').text(' | 2021 - 2024');
doc.font('Helvetica').text('Cumulative Score: 75% CGPA (Graduated with Distinction)');

// --- CERTIFICATIONS ---
drawHeader('Certifications');
const certs = [
    'JavaScript for Beginners - SimpliLearn',
    'Introduction to Front End Development - SimpliLearn',
    'Getting Started with NodeJS - SimpliLearn',
    'Azure Fundamentals - SimpliLearn',
    'Introduction to the Fundamentals of Databases - SimpliLearn'
];
certs.forEach(cert => {
    doc.font('Helvetica').text(`•  ${cert}`, { indent: 15 });
});

doc.end();
