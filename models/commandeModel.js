const mongoose = require("mongoose");
const commande = mongoose.model(
    "commande",
    {
        idclient: {
            type: String,
            required: true
        },
        idlivreur: {
            type: String,
            required: true
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
        etat: {
            type: Number,
            required: true,
            default: 1
        },
    }
);
module.exports = commande;