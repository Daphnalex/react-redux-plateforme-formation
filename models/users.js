const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    activate: {
        type: Boolean,
        required: true,
        default: false
    },
    _id: Schema.Types.ObjectId
});

module.exports = mongoose.model('User',UserSchema);
