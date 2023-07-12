const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    passwordHash: {
        type: String,
        require: true,
        minLength: 5
    },
    deck: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card"
        }
    ]
})

userSchema.set('toJSON', {
    transform: (doc, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.passwordHash;
    }
})

module.exports = mongoose.model('User', userSchema);