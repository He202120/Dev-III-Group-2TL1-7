import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
 
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


const Team = mongoose.model('Team', teamSchema);

export default Team;