const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const questionsRouter = require('./controllers/questions');
const usersRouter = require('./controllers/users');
const cardsRouter = require('./controllers/cards');

mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.error('error with connection to mongoDB ' + error);
    });

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);

module.exports = app;