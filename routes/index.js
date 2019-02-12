const express = require('express');
const router = express.Router();
const path = require('path');

const ctrlUser = require('../controllers/user.controller');
const ctrlRessource = require('../controllers/ressource.controller');
const ctrlUpload = require('../controllers/upload.controller');
const ctrlClassSchool = require('../controllers/classSchool.controller');
const sharp = require('sharp');
const multer  = require('multer');
const fs = require('fs');


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './client/public/images')
    }
});

var uploadImage = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        console.log('fileFilter',file);
        ext = ext.toLowerCase();
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback({err:"Le fichier téléchargé doit obligatoirement être une image"})
        }
        callback(null, true)
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
    .route('/register')
    .post(ctrlUser.register)

router
    .route('/login')
    .post(ctrlUser.login);

router
    .route('/users')
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

router
    .route('/classes')
    .get(ctrlClassSchool.classGetAll)
    .post(ctrlClassSchool.classAddOne);

router.post('/uploadImage', (req, res) => {
    uploadImage(req, res, (err) => {
        var error;
        if ( err || !req.file ){
            console.log('err',err)
            if (err.code ==='LIMIT_FILE_SIZE'){
                error = {err:"Image téléchargée trop grande. Taille maximale autorisée : 50Mb"};
                return res.send({ error: error });
            }
            return res.send({ error: err });
        } else {
            let image = null;
            console.log("file",req.file);
            if (req.file){
                let app_url = req.headers.origin;
                console.log("url app",app_url);
                filename = path.basename(req.file.path);
                console.log('filename',filename)
                sharp('./client/public/images/'+filename).resize(800).toFile('./client/public/images/resize_'+filename, (err,info) =>{
                    if(err) {
                        throw err
                    } else {
                        fs.unlink('./client/public/images/'+filename, (err) => {
                            if (err) throw err;
                            console.log('successfully deleted ./client/public/images/'+filename);
                            return res.status(200).send({file: req.file, resizePath: '/images/resize_'+filename});
                        });
                    };
                    console.log(info);
                    
                });
            }
            
            
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