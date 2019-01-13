const mongoose = require('mongoose');

const Ressource = require('../models/ressources');

module.exports.ressourceGetAll = (req, res) => {
    Ressource.find()
        .then(ressources => res.json(ressources))
        .catch(error => res.json(error))
}

module.exports.ressourceGetOne = (req, res) => {
    Ressource.findById(req.params.ressourceId)
        .then(ressource => res.json(ressource))
        .catch(err => res.json(err))
}

module.exports.ressourceAddOne = (req, res) => {
    const newRessource = new Ressource({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        typeOfRessource: req.body.typeOfRessource,
        authorId: req.body.authorId,
        shareRessource: req.body.shareRessource,
        questions: req.body.questions
    });
    console.log('newRessource', newRessource);
    newRessource.save().then(ressource => res.json(ressource)).catch(err => res.json(err));
}

module.exports.ressourceDeleteOne = (req, res) => {
    Ressource.findById(req.params.ressourceId)
        .then((ressource) => ressource.remove().then(() => res.json({ success: true, message: "Ressource deleted" }).catch(() => res.json({ success: false, message: "Error to delete ressource" }))))
        .catch(err => res.json(err))
}

module.exports.ressourceUpdateOne = (req,res) => {
    Ressource.findById(req.params.ressourceId)
        .then((ressource) => {
            ressource.title = req.body.title || ressource.title;
            order: req.body.order || ressource.order;
            description: req.body.description || ressource.description;
            typeOfRessource: req.body.typeOfRessource || ressource.typeOfRessource;
            authorId: req.body.authorId || ressource.authorId;
            shareRessource: req.body.shareRessource || ressource.shareRessource;
            questions: req.body.questions || ressource.questions;
            ressource.save().then(ressource => res.json({success: true, ressource: ressource, message: 'Ressource updated'})).catch(() => res.json({success: false, message: "Error to update ressource"}))
        }).catch(err => res.json(err));
}