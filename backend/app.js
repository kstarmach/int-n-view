const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const questionsRouter = require('./controllers/questions');

mongoose.connect(config.MONGODB_URI)
.then(() => {
    console.log('connected to MongoDB');
})
.catch((error) =>{
    console.error('error with connection to mongoDB ' + error);
});

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRouter);

module.exports = app;