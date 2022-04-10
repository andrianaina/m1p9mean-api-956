const mongoose = require("mongoose");
const commandedetail = mongoose.model(
    "commandedetail",
    {
        idcommande: { type: mongoose.Schema.Types.ObjectId, ref: "commande" },
        idplatrestaurant: { type: mongoose.Schema.Types.ObjectId, ref: "platrestaurant" },
        nb: {
            type: Number,
            required: true
        },
        islivrable: {
            type: Number,
            required: true,
            default: 0
        }
    }
);
module.exports = commandedetail;