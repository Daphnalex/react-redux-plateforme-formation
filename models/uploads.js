const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema({
    path: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Upload",UploadSchema);