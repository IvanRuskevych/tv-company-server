const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? './environments/production.env' : './environments/.env',
});

const { authRouter, showsRouter, customersRouter, agentsRouter } = require('./routes');

const app = express();
const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRouter);
app.use('/shows', showsRouter);
app.use('/customers', customersRouter);
app.use('/agents', agentsRouter);

// Error settings
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

module.exports = app;
