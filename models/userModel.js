const mongoose = require("mongoose");
const userModel = mongoose.model(
    "user",
    {
        username: {
            type: String,
            required: true
        },
        tel: {
            type: String
        },
        address: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        mdp: {
            type: String,
            required: true
        },
        role: {
            type: String
        },
        isactive: {
            type: Number,
            required: true,
            default: 0
        },
        insertdate: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
);
module.exports = userModel;