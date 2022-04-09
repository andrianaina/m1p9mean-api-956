const mongoose = require("mongoose");
const commandedetail = mongoose.model(
    "commandedetail",
    {
        idcommande: {
            type: String,
            required: true
        },
        idplatrestaurant: {
            type: String,
            required: true
        },
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