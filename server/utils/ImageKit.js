const ImageKit = require('imagekit');
const config = require('../config/app.config');

const imagekit = new ImageKit({
  publicKey: config.IMAGE_KIT_PUBLIC_KEY,
  privateKey: config.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGE_KIT_URL_ENDPOINT,
});

module.exports = imagekit;
