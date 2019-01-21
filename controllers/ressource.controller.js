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
    console.log('req de add',req.body)
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
        .then((ressource) => ressource.remove().then((ressource) => res.json({ success: true, message: "Ressource deleted", ressource: ressource }).catch((err) => res.json({ success: false, message: "Error to delete ressource" }))))
        .catch(err => res.json(err))
}

module.exports.ressourceUpdateOne = (req,res) => {
    console.log('entre dans le update du back',req.body)
    Ressource.findById(req.params.ressourceId)
        .then((ressource) => {
            ressource.title = req.body.title;
            ressource.order = req.body.order;
            ressource.description = req.body.description;
            ressource.shareRessource = req.body.shareRessource;
            ressource.questions = req.body.questions;
            console.log("ressource avant sauvegarde", ressource)
            ressource.save().then(ressource => {
                console.log('ressource updated',ressource);
                res.json(ressource)
            }).catch(() => res.json({success: false, message: "Error to update ressource"}))
        }).catch(err => res.json(err));
}
