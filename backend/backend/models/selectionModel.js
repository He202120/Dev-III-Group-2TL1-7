import mongoose from "mongoose";

const selectionSchema = mongoose.Schema({
 
    name: {
        type: String,
        required: true,
    },
    formation: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true
    }

},{

    timestamps: true // This will automatically add timestamps for any operations done.

});


const Selection = mongoose.model('Selection', selectionSchema);

export default Selection;