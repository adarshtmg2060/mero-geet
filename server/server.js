const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED EXCEPTION! 💥 Shutting down...')
  );

  process.exit(1);
});

const app = require('./app');

const DB = process.env.MONGODB_URI;
mongoose
  .connect(DB)
  .then(() => {
    console.log(chalk.hex('#78dce8').bold('DATABASE CONNECTION SUCCESSFUL'));
  })
  .catch((err) => {
    console.log(err);
  });
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk
      .hex('#78dce8')
      .bold(`LISTENING ON PORT http://localhost:${process.env.PORT}`)
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED REJECTION! 💥 Shutting down...')
  );
  server.close(() => {
    process.exit(1);
  });
});
