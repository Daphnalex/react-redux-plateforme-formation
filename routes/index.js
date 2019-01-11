const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlRessource = require('../controllers/ressource.controller');

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
    .get(ctrlRessource.ressourceGetAll);

module.exports = router;