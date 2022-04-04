const mongoose = require("mongoose");

const platrestaurant = mongoose.model(
    "platrestaurant",
    {
        name: {
            type: String,
            required: true
        },
        idrestaurant: {
            type: String,
            required: true
        },
        prixderevient: {
            type: Number,
            required: true
        },
        prix: {
            type: Number,
            required: true
        },
        insertdate: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
);
module.exports = platrestaurant;