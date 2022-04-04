const express = require('express');

const routeur = express.Router('../models/platrestaurantModel');
const ObjectID = require('mongoose').Types.ObjectId;

const platrestaurantModel = require('../models/platRestaurantModel');

routeur.post('/add', (req, res) => {
    if (req.body.idrestaurant == null || req.body.name == null || req.body.prix == null || req.body.prixdevente == null) {
        return res.status.status(400).send('parameters is missing');
    }

    const newPlatRecord = new commandeModel({
        idrestaurant: req.body.idrestaurant,
        name: req.body.name,
        prixderevient: req.body.prixderevient,
        prix: req.body.prix,
    });

    newPlatRecord.save().then()
        .catch((err) => {
            if (err) {
                res.status(400).send('cannot to send Request:' + err);
            }
        });
    res.status(200).send('success');
});

routeur.get('/', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)

    platrestaurantModel.find((err, result) => {
        res.status(200).send(result);
    });
});

routeur.get('/:id', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)

    platrestaurantModel.findOne(req.params.id, (err, result) => {
        if (!result) {
            res.status(400).send('no commande find');
        }
        else {
            res.status(200).send(result);
        }
    });
});

// routeur.post('/delete/:id', (req, res) => {
//     // if (!ObjectID.isValid(req.params.id))
//     //     return res.status(400).send("ID unknow:" + req.params.id)
//     commandeModel.findOneAndDelete(req.params.id, (err, result) => {
//         if (!err) res.status(400).send(result);
//         else res.status(400).send('Delete error:' + err);
//     });
// });

module.exports = routeur;