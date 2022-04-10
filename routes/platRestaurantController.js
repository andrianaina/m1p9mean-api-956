const express = require('express');

const routeur = express.Router('../models/platrestaurantModel');
const ObjectID = require('mongoose').Types.ObjectId;

const platrestaurantModel = require('../models/platRestaurantModel');

routeur.post('/add', (req, res) => {
    if (req.body.idrestaurant == null || req.body.name == null || req.body.prix == null || req.body.prixrestaurant == null || req.body.cout == null) {
        return res.status(400).send('parameters is missing');
    }

    const newPlatRecord = new platrestaurantModel({
        idrestaurant: req.body.idrestaurant,
        name: req.body.name,
        prixrestaurant: req.body.prixrestaurant,
        prix: req.body.prix,
        cout: req.body.cout
    });

    newPlatRecord.save().catch((err) => {
        if (err) {
            console.log(err);
            res.status(400).send('error');
        }
    });
});

routeur.get('/', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)

    platrestaurantModel.find((err, result) => {
        res.status(200).send(result);
    });
});

routeur.get('/platrestaurant/:id', (req, res) => {
    platrestaurantModel.find({}).populate('idrestaurant').exec((err, result) => {
        rep = [];
        result.forEach(element => {
            if (element.idrestaurant.equals(req.params.id)) {
                rep.push(element);
            }
        })
        res.status(200).send(rep);
    });
});
routeur.put('/visibility', (req, res) => {
    const updateRecord = {
        isvisible: 0
    }
    platrestaurantModel.findByIdAndUpdate(
        { _id: req.body.id },
        { isvisible: req.body.isvisible },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
})


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