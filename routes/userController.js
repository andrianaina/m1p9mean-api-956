const express = require('express');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.util');

const crypto = require('crypto');

const userModel = require('../models/userModel');
const routeur = express.Router('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

routeur.get('/role/:role', (req, res) => {
    userModel.find({ role: req.params.role }, (err, results) => {
        console.log(results);
        res.status(200).send(results);
    });
});
routeur.get('/profil', (req, res) => {
    var headerAuth = req.headers['authorization'];
    var idUser = jwtUtils.getUserId(headerAuth);
    if (idUser < 0)
        return res.status(400).send('wrong token');

    userModel.findOne
        ({
            attributes: ['id', 'username', 'email', 'role'],
            where: { id: idUser }
        })
        .then(function (user) {
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(400).send('user not found');
            }
        }
        ).catch(function (err) {
            res.status(400).send('cannot fetch user');
        }
        );
});
routeur.get('/restaurant', function (req, res) {
    userModel.find({ role: 'restaurant' }, (err, results) => {
        res.status(200).send(results);
    });
});
routeur.post('/login', (req, res) => {

    var username = req.body.username;
    var mdp = req.body.mdp;
    if (username == null || mdp == null) {
        return res.status(400).send('parameters is missing');
    }
    userModel.findOne({ username: username }).then(function (userFound) {
        if (userFound)
            bcrypt.compare(mdp, userFound.mdp, function (errbcrypt, resCompare) {
                if (resCompare) {
                    return res.status(200).send({
                        'idUser': userFound.id,
                        'role': userFound.role,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    });
                }
                else {
                    return res.status(400).send('username or mdp is invalid');
                }
            })
    });
})

routeur.delete('/disconnect', (req, res) => {
    return res.status(200).send('you are disconnected');
})

routeur.post('/register', (req, res) => {
    if (req.body.role == null || req.body.role == "" || req.body.username == null || req.body.email == null || req.body.mdp == null) {
        return res.status(400).send('parameters is missing');
    }
    if (req.body.username.length < 4) {
        return res.status(400).send('wrong username (>=4 characters) ');
    }
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).send('email format invalid');
    }
    userModel.findOne({ username: req.body.username }).then(function (userFound) {
        if (!userFound) {
            bcrypt.hash(req.body.mdp, 5, function (err, cryptedpassword) {
                var active = 1;
                if (req.body.role == 'admin') {
                    active = 0;
                }
                const newRecord = new userModel({
                    username: req.body.username,
                    mdp: cryptedpassword,
                    email: req.body.email,
                    tel: req.body.tel,
                    address: req.body.address,
                    role: req.body.role,
                    isactive: active
                });
                newRecord.save().then(function (newRecord) {
                    return res.status(200).send({ 'userId': newRecord.id });
                }
                ).catch(function (err) {
                    return res.status(400).send('cannot add user');
                });
            });
        } else {
            return res.status(400).send('User already exist');
        }
    }).catch(function (err) {
        return res.status(400).send('cannot add user');
    });
});

routeur.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow:" + req.params.id)
    const updateRecord = {
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
        address: req.body.address
    }
    userModel.findByIdAndUpdate(
        req.params.id, { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log('Update error:' + err);
        }
    )
})
routeur.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow:" + req.params.id);
    userModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.status(400).send(docs);
        else res.status(400).send('Delete error:' + err);
    });
});
module.exports = routeur;