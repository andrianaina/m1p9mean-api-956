const mongoose = require("mongoose");
const commande = mongoose.model(
    "commande",
    {
        idclient: {
            type: String,
            required: true
        },
        idlivreur: {
            type: String
        },
        address: {
            type: String,
            required: true
        },
        livraisondate: {
            type: Date,
            required: true
        },
        insertdate: {
            type: Date,
            required: true,
            default: Date.now()
        },
        detail: [{
            idplatrestaurant: {
                type: String,
                required: true
            },
            nb: {
                type: Number,
                required: true
            }
        }],
        islivre: {
            type: Number,
            required: true,
            default: 0
        },
        islivrable: {
            type: Number,
            required: true,
            default: 0
        },
        etat: {
            type: Number,
            required: true,
            default: 1
        },
    }
);
module.exports = commande;