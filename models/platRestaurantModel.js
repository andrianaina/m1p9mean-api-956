const mongoose = require("mongoose");
const platrestaurant = mongoose.model(
    "platrestaurant",
    {
        name: {
            type: String,
            required: true
        },

        // idrestaurant: {
        //     type: String,
        //     required: true
        // },
        idrestaurant: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        prixrestaurant: {
            type: Number,
            required: true
        },
        prix: {
            type: Number,
            required: true
        },
        cout: {
            type: Number,
            required: true
        },
        isvisible: {
            type: Number,
            required: true,
            default: 1
        },
        insertdate: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
);
module.exports = platrestaurant;