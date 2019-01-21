const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlRessource = require('../controllers/ressource.controller');
const ctrlUpload = require('../controllers/upload.controller');


var multer  = require('multer')
var upload = multer({ dest: './client/public/uploads/' })


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

router.post('/uploads', upload.single('uploadFile'),ctrlUpload.uploadAddOne)

module.exports = router;