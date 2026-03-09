const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    margin: 50,
    size: 'A4',
    info: {
        Title: 'Nitheenkumar_P_Resume',
        Author: 'Nitheenkumar P',
        Keywords: 'Full Stack Developer, Software Engineer, Frontend, Backend, React.js, Node.js, JavaScript, MySQL, Web Development, REST APIs, Agile',
        Subject: 'Resume of Nitheenkumar P'
    }
});
doc.pipe(fs.createWriteStream('public/resume.pdf'));

// Helper function for perfectly standard ATS section headers
const drawHeader = (text) => {
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000000').text(text.toUpperCase());
    // Draw an ATS-safe line below the header
    doc.moveTo(doc.x, doc.y).lineTo(doc.x + 495, doc.y).strokeColor('#000000').lineWidth(1).stroke();
    doc.moveDown(0.4);
};

// --- HEADER SECTION ---
// ATS parsers look for name heavily weighted at the top
doc.font('Helvetica-Bold').fontSize(22).fillColor('#000000').text('NITHEENKUMAR P', { align: 'center' });
doc.moveDown(0.2);

// Standardized contact info layout for ATS
doc.font('Helvetica').fontSize(10).text('Madurai, Tamil Nadu | Phone: +91 7094998196 | Email: nitheenkumar18@gmail.com', { align: 'center' });
doc.text('Portfolio: portfolio-navy-pi-87.vercel.app | LinkedIn: linkedin.com/in/nitheenkumar15 | GitHub: github.com/Nitheenkumar15', { align: 'center' });
doc.moveDown(0.2);

// --- PROFESSIONAL SUMMARY ---
drawHeader('Professional Summary');
doc.font('Helvetica').fontSize(10).text(
    'Results-driven Full Stack Developer with expertise in designing, developing, and deploying scalable web applications using modern JavaScript, React.js, and Node.js. Adept at engineering robust RESTful APIs, architecting optimal database schemas in MySQL, and building responsive, mobile-first user interfaces. Passionate about software architecture, optimizing application performance, and delivering high-quality user experiences in agile software development environments.'
);

// --- TECHNICAL SKILLS ---
drawHeader('Technical Skills');
const technicalSkills = [
    { category: 'Frontend', skills: 'HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap, Responsive UI' },
    { category: 'Backend', skills: 'Node.js, Express.js, RESTful APIs, PHP, Authentication (Bcrypt)' },
    { category: 'Database', skills: 'MySQL, Relational Database Design, Data Modeling, Query Optimization' },
    { category: 'Tools & Workflows', skills: 'Git, GitHub, VS Code, Postman, Agile Methodology, Web Performance Optimization' }
];

// Formatting skills in typical ATS key-value style
technicalSkills.forEach(item => {
    doc.font('Helvetica-Bold').fontSize(10).text(`${item.category}: `, { continued: true });
    doc.font('Helvetica').text(item.skills);
});

// --- PROFESSIONAL EXPERIENCE ---
drawHeader('Professional Experience');
doc.font('Helvetica-Bold').fontSize(11).text('Full Stack Developer Intern | WilTeck - Madurai, Tamil Nadu');
doc.font('Helvetica-Oblique').fontSize(10).text('Duration: 1 Month');
doc.moveDown(0.2);
const internPoints = [
    'Spearheaded the development of dynamic and responsive user interface components utilizing HTML, CSS, and modern JavaScript, leading to enhanced user engagement.',
    'Identified, debugged, and resolved complex cross-browser compatibility issues, enhancing overall system reliability and User Experience (UX).',
    'Collaborated effectively within an agile team framework utilizing Git and GitHub for seamless version control and CI/CD pipelines.',
    'Assisted in back-end system integration and optimized MySQL database operations for streamlined application performance.'
];
internPoints.forEach(point => {
    doc.font('Helvetica').text(`•  ${point}`, { indent: 15 });
});

// --- PROJECTS ---
drawHeader('Projects');
doc.font('Helvetica-Bold').fontSize(11).text('AAC Alumni Management System');
doc.font('Helvetica-Oblique').fontSize(10).text('Technologies Used: React.js, Node.js, Express.js, MySQL, REST API');
doc.moveDown(0.2);
const projectPoints1 = [
    'Architected and deployed a comprehensive full-stack platform facilitating user registration, profile management, and network communication for college alumni.',
    'Engineered secure, scalable RESTful APIs using Node.js and Express.js to interface seamlessly with a normalized MySQL database.',
    'Implemented state management and dynamic routing using React.js to deliver a seamless Single Page Application (SPA) experience.',
    'Optimized database queries and backend logic, resulting in highly efficient data retrieval and robust application scalability.'
];
projectPoints1.forEach(point => {
    doc.font('Helvetica').text(`•  ${point}`, { indent: 15 });
});

// --- EDUCATION ---
drawHeader('Education');
doc.font('Helvetica-Bold').fontSize(11).text('Master of Computer Applications (MCA) | 2024 - 2026');
doc.font('Helvetica').fontSize(10).text('Arul Anandar College (Autonomous), Madurai Kamaraj University');
doc.font('Helvetica').text('Cumulative Score: 78% CGPA');
doc.moveDown(0.3);

doc.font('Helvetica-Bold').fontSize(11).text('Bachelor of Science (B.Sc.) in Computer Science | 2021 - 2024');
doc.font('Helvetica').fontSize(10).text('Meenakshi Ammal Arts and Science College, University of Madras');
doc.font('Helvetica').text('Cumulative Score: 75% CGPA (Graduated with Distinction)');

// --- CERTIFICATIONS & ACHIEVEMENTS ---
drawHeader('Certifications & Achievements');
const certs = [
    'International Conference Presenter ("Machine Learning Algorithms in Risk Assessment") - Impact of AI in Sports and Computing, 2026',
    'Smart Techies Award - Outstanding Innovation Recognition for "Digital Permission Management System", 2025',
    'Introduction to Front End Development - SimpliLearn',
    'Getting Started with NodeJS - SimpliLearn',
    'Azure Fundamentals - SimpliLearn',
    'Introduction to the Fundamentals of Databases - SimpliLearn'
];
certs.forEach(cert => {
    doc.font('Helvetica').text(`•  ${cert}`, { indent: 15 });
});
// Add Certificate to Resume as an Image
doc.addPage();
// Center and title the certificate page
doc.font('Helvetica-Bold').fontSize(14).text('PRESENTATION CERTIFICATE - INTERNATIONAL CONFERENCE', { align: 'center' });
doc.moveDown(1.5);
// Draw the image onto the PDF
try {
    doc.image('public/Paper_Presentation.jpeg', {
        fit: [450, 600],
        align: 'center',
        valign: 'top'
    });
} catch (e) {
    console.warn("Could not load public/Paper_Presentation.jpeg for PDF generation: ", e);
}

doc.end();
