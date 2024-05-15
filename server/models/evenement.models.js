const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evenementSchemat = new Schema({
        date_start: {
            type: Date,
            required: true
        },

        date_end: {
            type: Date,
            required: true
        },

        evenements: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Evenement = mongoose.model('Evenement', evenementSchemat);

module.exports = Evenement;