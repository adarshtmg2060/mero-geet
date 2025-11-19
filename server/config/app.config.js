const dotenv = require('dotenv');

dotenv.config();

const appConfig = () => ({
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  IMAGE_KIT_PUBLIC_KEY: process.env.IMAGE_KIT_PUBLIC_KEY,
  IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY,
  IMAGE_KIT_URL_ENDPOINT: process.env.IMAGE_KIT_URL_ENDPOINT,
  SMPT_SERVER: process.env.SMPT_SERVER,
  SMPT_PORT: process.env.SMPT_PORT,
  BREVO_USER: process.env.BREVO_USER,
  BREVO_PASS: process.env.BREVO_PASS,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
});

module.exports = appConfig();
