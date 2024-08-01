import mongoose from 'mongoose';

const equipmentSchema = mongoose.Schema({
    equipment: {
        type: String,
        enum: ['jersey_top_type', 'jersey_bottom_type', 'shin_guard','socks','no'],
        required: true
    },
    equipment_size: {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "no"],
        required: true
    },
    equipment_type: {
        type: String,
        enum: ['training', 'match', 'no'],
        required: true
    },
    special_Request: {
        type: String
    }
}, {
    timestamps: true
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;
