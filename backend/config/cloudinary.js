import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Explicitly configuring Cloudinary to ensure all credentials are picked up correctly
cloudinary.config({
    cloud_name: 'daguhgfl9',
    api_key: '218629249518647',
    api_secret: 'rJQaq2oZ7vO5oYq7_veW09NX6p4',
    secure: true
});

export default cloudinary;
