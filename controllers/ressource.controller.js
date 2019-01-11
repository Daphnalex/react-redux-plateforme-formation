const mongoose = require('mongoose');

const Ressource = require('../models/ressources');

module.exports.ressourceGetAll = (req,res) => {
    Ressource.find()
        .then(ressources => res.json(ressources))
        .catch(error => res.json(error) )
}