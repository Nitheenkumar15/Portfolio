const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    margin: 50,
    info: {
        Title: 'Resume - Nitheenkumar P',
        Author: 'Nitheenkumar P',
        Keywords: 'Frontend Developer, React, JavaScript, Node.js, Portfollio, Web Developer'
    }
});
doc.pipe(fs.createWriteStream('public/resume.pdf'));

const drawHeader = (text) => {
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(11).text(text.toUpperCase());
    doc.moveTo(doc.x, doc.y).lineTo(doc.x + 500, doc.y).strokeColor('#cccccc').stroke();
    doc.moveDown(0.5);
};

// Title
doc.font('Helvetica-Bold').fontSize(20).text('NITHEENKUMAR P', { align: 'center' });
doc.font('Helvetica').fontSize(10).text('Madurai, Tamil Nadu | +91 7094998196 | nitheenkumar18@gmail.com', { align: 'center' });
doc.text('LinkedIn: linkedin.com/in/nitheenkumar15 | GitHub: github.com/Nitheenkumar15', { align: 'center' });
doc.moveDown(0.5);

drawHeader('Career Objective');
doc.font('Helvetica').fontSize(10).text('Frontend Developer with hands-on experience in JavaScript, React, and Node.js. Skilled in building responsive web applications, API integration, and clean UI development. Seeking an opportunity to contribute to modern web projects while expanding technical expertise.');

drawHeader('Educational Qualifications');
doc.font('Helvetica-Bold').fontSize(10).text('Master of Computer Applications (MCA)', { continued: true });
doc.font('Helvetica').text(' | Arul Anandar College (Autonomous), Karumathur', { align: 'left' });
doc.text('Madurai Kamaraj University');
doc.text('Degree Awarded with 78% CGPA | Duration: 2024 - 2026');
doc.moveDown(0.3);
doc.font('Helvetica-Bold').fontSize(10).text('Bachelor of Science (B.Sc.) in Computer Science', { continued: true });
doc.font('Helvetica').text(' | Meenakshi Ammal Arts and Science College, Uthiramerur', { align: 'left' });
doc.text('University of Madras');
doc.text('Graduated with Distinction - 75% CGPA | Duration: 2021 - 2024');

drawHeader('Technical Skills');
const skills = [
    'Languages: JavaScript',
    'Frontend: HTML5, CSS3, React.js',
    'Backend: Node.js, REST API Development',
    'Database: MySQL',
    'Tools: Git, GitHub, VS Code'
];
skills.forEach(skill => {
    doc.font('Helvetica').text(`•    ${skill}`, { indent: 10 });
});

drawHeader('Projects');
doc.font('Helvetica-Bold').fontSize(10).text('AAC Alumni Management System', { continued: true });
doc.font('Helvetica').text(' | Live link: https://coe.aactni.edu.in/apr26/24MCA514/');
doc.font('Helvetica-Oblique').text('Tech Stack: React.js, Node.js, MySQL');
doc.moveDown(0.2);
const projectPoints = [
    'Developed a full-stack alumni platform enabling registration, profile management, and communication.',
    'Built RESTful APIs using Node.js and integrated MySQL for secure data storage.',
    'Implemented responsive UI using React ensuring cross-browser compatibility.',
    'Improved system usability by creating admin features for managing alumni data.'
];
projectPoints.forEach(point => {
    doc.font('Helvetica').text(`•    ${point}`, { indent: 10 });
});

drawHeader('Internships / Training');
doc.font('Helvetica-Bold').fontSize(10).text('Full Stack Developer Intern | WilTeck | 1 Month | Madurai');
doc.moveDown(0.2);
const internPoints = [
    'Developed responsive UI components using HTML, CSS, and JavaScript.',
    'Debugged and resolved cross-browser UI issues improving application usability.',
    'Collaborated with developers using Git and GitHub for version control.',
    'Assisted in backend integration and database operations.'
];
internPoints.forEach(point => {
    doc.font('Helvetica').text(`•    ${point}`, { indent: 10 });
});
doc.font('Helvetica-Oblique').fontSize(9).text('Certificate ID: WTMDU866', { indent: 10 });

drawHeader('Certifications');
const certs = [
    'Introduction to Front End Development - SimpliLearn',
    'Getting Started with NodeJS - SimpliLearn',
    'Azure Fundamentals - SimpliLearn',
    'Introduction to the Fundamentals of Databases - SimpliLearn',
    'Introduction to MS Excel - SimpliLearn'
];
certs.forEach(cert => {
    doc.font('Helvetica').text(`•    ${cert}`, { indent: 10 });
});

doc.moveDown(0.5);

drawHeader('Soft Skills');
const softSkills = [
    'Problem Solving',
    'Communication Skills',
    'Time Management',
    'Adaptability',
    'Team Player',
    'Attention to Detail'
];
doc.font('Helvetica').text('•    ' + softSkills.join('    •    '), { indent: 10 });

doc.end();
