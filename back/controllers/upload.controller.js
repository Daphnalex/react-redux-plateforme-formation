const mongoose = require('mongoose');

const Upload = require('../models/uploads');

module.exports.uploadAddOne = (req, res) => {
    console.log('post upload file',req.file)
    console.log('req de add',req.body)
    const newUpload = new Upload({
        //typeOf: req.body.typeOf,
        path: req.file.path
    });
    console.log('newUpload', newUpload);
    newUpload.save().then(upload => res.json(upload)).catch(err => res.json(err));
    
}

module.exports.uploadGetAll = (req, res) => {
    Upload.find()
        .then(uploads => res.json(uploads))
        .catch(error => res.json(error))
}