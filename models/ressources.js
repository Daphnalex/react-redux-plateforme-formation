const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RessourceSchema = new Schema({
    typeOfRessource: {
        type: String,
        required: true 
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    shareRessource: {
        type: Bool,
        required: true,
        default: false
    },
    ressource: {
        type: Schema.Types.Mixed,
        required: true
    }
});
module.exports = mongoose.model('Ressource',RessourceSchema);