const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

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

module.exports = router;