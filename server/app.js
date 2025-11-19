const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const songRouter = require('./routes/songRoutes');
const userRouter = require('./routes/userRoutes');
const playlistRouter = require('./routes/playlistRoutes');
const searchRouter = require('./routes/searchRoutes');
const config = require('./config/app.config');

const app = express();

const FRONTEND_ORIGIN =
  config.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://mero-geet-dhwm.vercel.app/login';

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.use('/public', express.static('public'));

app.use('/api/v1/songs', songRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/playlists', playlistRouter);
app.use('/api/v1/search', searchRouter);

app.get('/api/v1/user', (req, res) => {
  res.send('testing base rounte');
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
