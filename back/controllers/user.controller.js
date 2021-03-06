const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

var User = require('../models/users');

module.exports.register = (req,res) => {
    console.log('add user',req.body);
    const newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        profile: req.body.profileUser,
        email: req.body.email
    })
    newUser.save().then(user => res.json(user)).catch(err => {
        console.log('error',err);
        if (err.code === 11000){
            var message = "Nom d'utilisateur déjà existant";
        }
        res.status(409).json({message: message});
    });
}

module.exports.userUpdateOne = (req,res) => {
    User.findById(req.params.userId)
        .then(user =>{
            user.username = req.body.username || user.username;
            user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            user.profile = req.body.profile || user.profile;
            user.email = req.body.email || user.email;
            user.save().then(user => res.json(user)).catch(err => res.json(err));
        })
        .catch(err => res.status(404).json(err));
}

module.exports.userGetAll = (req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
}

module.exports.userGetOne = (req,res) => {
    User.findById(req.params.userId)
        .then(user => res.json(user))
        .catch(err => res.json(err));
}

module.exports.login = (req,res) => {
    console.log('user login',req.body);
    User.findOne({username: req.body.username})
        .then(user => {
            console.log('User found',user);
            if (user === null){
                return res.status(404).json({success: false, token: null, error: "Nom d'utilisateur invalide."});
            }

            if (bcrypt.compareSync(req.body.password,user.password)){
                if(user.activate === false){
                    user.username = user.username;
                    user.password = user.password;
                    user.profile = user.profile;
                    user.email = user.email;
                    user.activate = true;
                    user.save().then(user => console.log('user activate',user)).catch(err => console.log('user not activate',err));
                }
                var token = jwt.sign(
                    {
                        _id: user._id,
                        username: user.username,
                        role: user.profile
                    },
                    keys.secret,
                    {expiresIn: 3600}
                );
                res.status(200)
                    .json({success: true, token: token})
            } else {
                console.log('Error password');
                res
                    .status(401)
                    .json({success: false, token: null, error: "Mot de passe invalide."})
            }
        })
}
