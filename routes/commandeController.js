const express = require('express');
const routeur = express.Router('../models/commandeModel');
const ObjectID = require('mongoose').Types.ObjectId;

const commandeModel = require('../models/commandeModel');
const commandeDetailModel = require('../models/commandeDetailModel');
routeur.post('/add', (req, res) => {
    if (req.body.idclient == null || req.body.address == null || req.body.livraisondate == null) {
        return res.status.status(400).send('parameters is missing');
    }

    livreur = 1;

    const newcommandeRecord = new commandeModel({
        idclient: req.body.idclient,
        address: req.body.address,
        livraisondate: req.body.livraisondate,
        idlivreur: livreur,
    });
    newcommandeRecord.save().then(function (newcommande) {
        req.body.panier.forEach(element => {
            if (element.nb < 1) {
                res.status(400).send('nb of any plat > 0:' + err);
            }
            const newcommandedetailRecord = new commandeDetailModel({
                idcommande: newcommande.id,
                idplatrestaurant: element.id,
                nb: element.nb
            });
            newcommandedetailRecord.save().then().catch(function (err) {
                commandeDetailModel.deleteMany({ idcommande: newcommande.id });
                commandeModel.deleteOne({ id: newcommande.id });
                res.status(400).send('cannot to send Request:' + err);
            });
        });
    }).catch((err) => {
        res.status(400).send('cannot to send Request:' + err);
    });
    res.status(200).send('success');
});

routeur.get('/all/:id', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)
    commandeModel.find({ idclient: req.params.id }, (err, result) => {
        if (!result) {
            res.status(400).send('no commande find');
        }
        else {
            res.status(200).send(result);
        }
    });
});
routeur.get('/:id', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)
    commandeModel.findOne(req.params.id, (err, result) => {
        if (!result) {
            res.status(400).send('no commande find');
        }
        else {
            res.status(200).send(result);
        }
    });
});

routeur.get('/detail/:id', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)
    commandeModel.find({ idcommande: req.params.id }, (err, result) => {
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