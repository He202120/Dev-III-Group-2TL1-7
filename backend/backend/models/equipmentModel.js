import mongoose from 'mongoose';

const equipmentSchema = mongoose.Schema({
    jersey_top_type: {
        type: String,
        enum: ['training', 'match', 'no'],
        required: true
    },
    jersey_top_size: {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "no"],
        required: true
    },
    jersey_bottom_type: {
        type: String,
        enum: ['training', 'match', 'no'],
        required: true
    },
    jersey_bottom_size: {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "no"],
        required: true
    },
    shin_guard: {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "no"],
        required: true
    },
    socks: {
        type: String,
        enum: ['training', 'match', 'no'],
        required: true
    },
    sock_size: {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "no"],
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
