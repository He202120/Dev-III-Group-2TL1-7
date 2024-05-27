import mongoose from "mongoose";

const evenementSchema = mongoose.Schema({
 
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
    }

},{

    timestamps: true // This will automatically add timestamps for any operations done.

});


const Evenement = mongoose.model('Evenement', evenementSchema);

export default Evenement;