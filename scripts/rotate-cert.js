const Jimp = require('jimp');
const path = require('path');

async function rotateImage() {
    const imagePath = path.join(__dirname, '../public/internship_certificate.jpg');
    try {
        const image = await Jimp.read(imagePath);
        // Rotate 180 degrees to fix upside down view
        await image.rotate(180).write(imagePath);
        console.log('Image rotated successfully!');
    } catch (err) {
        console.error('Error rotating image:', err);
    }
}

rotateImage();
