const express = require('express');
const routeur = express.Router('../models/commandeModel');
const ObjectID = require('mongoose').Types.ObjectId;

const commandeModel = require('../models/commandeModel');
const commandeDetailModel = require('../models/commandeDetailModel');
const platrestaurantModel = require('../models/platRestaurantModel');
const userModel = require('../models/userModel');

routeur.post('/add', (req, res) => {
    if (req.body.idclient == null || req.body.address == null || req.body.livraisondate == null) {
        return res.status(400).send('parameters is missing');
    }

    livreur = '6250037acb5569c74e0fdfl';

    const newcommandeRecord = new commandeModel({
        idclient: req.body.idclient,
        address: req.body.address,
        livraisondate: req.body.livraisondate,
        idlivreur: livreur
    });
    newcommandeRecord.save().then(function (newcommande) {
        req.body.panier.forEach(element => {
            if (element.nb < 1) {
                res.status(400).send('nb of any plat > 0');
            }
            if (!element.id) {
                res.status(400).send('plat not Found');
            }
            const newcommandedetailRecord = new commandeDetailModel({
                idcommande: newcommande.id,
                idplatrestaurant: element.id,
                nb: element.nb
            });
            newcommandedetailRecord.save().then().catch((err) => {
                commandeDetailModel.deleteMany({ idcommande: newcommande.id });
                commandeModel.deleteOne({ id: newcommande.id });
                console.log(err);
            });
        });
    }).catch((err) => {
        console.log(err)
    });

    res.status(200).send("success");
});

routeur.put('/Plat/islivrable/:id', (req, res) => {
    commandeDetailModel.findByIdAndUpdate(
        { _id: req.params.id },
        { islivrable: 1 },
        function (err, result) {
            if (result) {
                commandeDetailModel.find({ _id: result._id }, (err, found) => {
                    var i = 0;
                    found.forEach(element => {
                        if (element.islivrable === 1) {
                            i++;
                        }
                    });

                    if (i === found.length) {
                        commandeModel.findByIdAndUpdate({ _id: result.idcommande }, { islivrable: 1 }, (error) => {
                            if (error) console.log(error);
                        });
                    }
                })
            }
        }
    ).catch((err) => {
        console.log(err)
    });
})
routeur.put('/updatelivreur', (req, res) => {
    console.log(req.body.id);
    commandeModel.findByIdAndUpdate(
        req.body.id,
        { idlivreur: req.body.idlivreur },
        (err, result) => {
        }
    );
})
routeur.put('/livre/:id', (req, res) => {
    commandeModel.findByIdAndUpdate(
        req.params.id,
        { islivre: 1 },
        function (err, result) {
        }
    );
})
routeur.get('/livreur/:id', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)
    commandeModel.find({ islivrable: 1, islivre: 0 }).populate('idlivreur').exec((err, result) => {
        rep = [];
        result.forEach(element => {
            if (element.idlivreur._id.equals(req.params.id)) rep.push(element);
        });
        res.status(200).send(rep);
    });
});
routeur.get('/restaurant/:id', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)
    commandeDetailModel.find({ islivrable: 0 }).populate('idcommande').populate('idplatrestaurant').exec((error, result) => {
        rep = [];
        if (result) {
            result.forEach(element => {
                if (element.idplatrestaurant.idrestaurant.equals(req.params.id)) rep.push(element);
            });
            res.status(200).send(rep);
        }
    });
});
// routeur.get('/restaurant/now/:id', (req, res) => {
//     // if (!ObjectID.isValid(req.params.id))
//     //     return res.status(400).send("ID unknow:" + req.params.id)
//     commandeDetailModel.find({ islivrable: 0 }, (result) => {
//         i = 0;
//         result.forEach(element => {
//             commandeModel.findOne({ _id: req.params.id, islivrable: 0 }, (err, found) => {
//                 if (found) {
//                     if (found.islivrable) {
//                         i++;
//                     }
//                 }
//             });
//         });
//         if (i === result.length) {
//             compileFunction
//         }
//         res.status(200).send(result);
//     });
// });
routeur.get('/admin/now/', (req, res) => {
    // if (!ObjectID.isValid(req.params.id))
    //     return res.status(400).send("ID unknow:" + req.params.id)

    commandeModel.find({ islivre: 0 }).populate('idclient').populate('idlivreur').exec((err, result) => {
        res.status(200).send(result);
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