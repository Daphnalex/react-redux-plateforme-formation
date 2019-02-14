const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./ressources');
require('./classSchool');

const Notes = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    times: String,
    note: String
});

const Score = new Schema({
    ressourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Ressource'
    },
    notes: [Notes]
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    firstname: String,
    lastname: String,
    profile: {
        type: String,
        required: true
    },
    class: {
        type: Array,
        ref: "ClassSchool"
    },
    results: {
        type: [Score],
        default: []
    },

});

module.exports = mongoose.model('User',UserSchema);
