const express = require('express');
const router = express.Router();
const path = require('path');

const ctrlUser = require('../controllers/user.controller');
const ctrlRessource = require('../controllers/ressource.controller');
const ctrlUpload = require('../controllers/upload.controller');


var multer  = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './client/public/images')
    }
});

var uploadImage = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback({err:"Le fichier téléchargé doit obligatoirement être une image"})
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
}).single('uploadImage');

var uploadVideo = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.mp4' && ext !== '.avi' && ext !== '.mov' && ext !== '.wmv') {
            return callback({err:"Le fichier téléchargé doit obligatoirement être une vidéo"})
        }
        callback(null, true)
    },
    limits:{
        fileSize: 50 * 1024 * 1024 //=50Mb
    }
}).single('uploadVideo');

router
    .route('/login')
    .post(ctrlUser.login);

router
    .route('/users')
    .post(ctrlUser.userAddOne)
    .get(ctrlUser.userGetAll);

router
    .route('/users/:userId')
    .put(ctrlUser.userUpdateOne)
    .get(ctrlUser.userGetOne);

router
    .route('/ressources')
    .post(ctrlRessource.ressourceAddOne)
    .get(ctrlRessource.ressourceGetAll);

router
    .route('/ressources/:ressourceId')
    .get(ctrlRessource.ressourceGetOne)
    .put(ctrlRessource.ressourceUpdateOne)
    .delete(ctrlRessource.ressourceDeleteOne);

router.post('/uploadImage', (req, res) => {
    uploadImage(req, res, (err) => {
        if ( err || !req.file ){
            console.log('err',err)
            return res.send({ error: err });
        } else {
            console.log("req.file",req.file)
            return res.status(200).send({file: req.file})
        }
    })
  });

  router.post('/uploadVideo', (req, res) => {
    uploadVideo(req, res, (err) => {
        if ( err || !req.file ){
            console.log('err',err)
            return res.send({ error: err });
        } else {
            console.log("req.file",req.file)
            return res.status(200).send({file: req.file})
        }
    })
  });

module.exports = router;