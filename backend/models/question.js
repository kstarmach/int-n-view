const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String
})

questionSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        return returnObject;
    }
})

module.exports = mongoose.model('Question', questionSchema);