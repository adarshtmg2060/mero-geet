const nodemailer = require('nodemailer');
const templates = require('./templates');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.name = user.name;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: '587',
      secure: true,
      logger: true,
      secureConnection: false,
      auth: {
        user: 'adarshtmg2060@gmail.com',
        pass: 'utjl yubo xgiq zqrh',
      },
    });
  }

  async send(subject, html) {
    const mailOptions = {
      from: 'adarshtmg2060@gmail.com',
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
