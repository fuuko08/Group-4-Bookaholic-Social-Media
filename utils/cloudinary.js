require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dyfykxwsf', 
  api_key: '225762492463351', 
  api_secret: 'I028QYHGG94nnGWD_eOyGM-PJ3Q' 
});

module.exports = cloudinary;