const chalk = require('chalk');
const mongoose = require('mongoose');
const config = require('./config/app.config');
const app = require('./app');

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED EXCEPTION! 💥 Shutting down...')
  );
  process.exit(1);
});

const DB = config.MONGODB_URI;

// Connect to DB FIRST, then start server
async function startServer() {
  try {
    await mongoose.connect(DB);
    console.log(chalk.hex('#78dce8').bold('DATABASE CONNECTION SUCCESSFUL'));

    const server = app.listen(config.PORT || 8000, () => {
      console.log(
        chalk
          .hex('#78dce8')
          .bold(`LISTENING ON PORT http://localhost:${config.PORT}`)
      );
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.log(err.name, err.message);
      console.log(
        chalk.hex('#ff6188').bold('UNHANDLED REJECTION! 💥 Shutting down...')
      );
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.log(chalk.hex('#ff6188').bold('DATABASE CONNECTION FAILED 💥'));
    console.error(err);
    process.exit(1);
  }
}

startServer();
