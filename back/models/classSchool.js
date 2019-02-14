const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ClassSchool',ClassSchema);