const mongoose = require('mongoose');

const ClassSchool = require('../models/classSchool');

module.exports.classGetAll = (req,res) => {
    ClassSchool.find()
        .then(classes => {
            res.json(classes);
        }).catch(error => res.json(error));
}

module.exports.classAddOne = (req,res) => {
    var newClassSchool = new ClassSchool({
        name: req.body.class
    })
    newClassSchool.save().then(classSchool => res.json(classSchool)).catch(error => res.json(error));
}