const nodemailer = require('nodemailer');
const templates = require('./templates');
const config = require('../config/app.config');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.name = user.name;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      host: config.SMPT_SERVER,
      port: config.SMPT_PORT,
      secure: true,
      logger: true,
      secureConnection: false,
      auth: {
        user: config.BREVO_USER,
        pass: config.BREVO_PASS,
      },
    });
  }

  async send(subject, html) {
    const mailOptions = {
      from: config.BREVO_USER,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('🎵 Welcome to Mero Geet 🎧', templates.welcomeTemplate());
  }

  async sendResetToken(resetToken) {
    await this.send('Reset token', templates.resetTokenTemplate(resetToken));
  }
};
