const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RessourceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    order: {
        type:String,
        required: true
    },
    typeOfRessource: {
        type: String,
        required: true 
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    shareRessource: {
        type: Boolean,
        required: true,
        default: false
    },
    questions: {
        type: Schema.Types.Mixed,
        required: true
    }
});
module.exports = mongoose.model('Ressource',RessourceSchema);