
import mongoose from 'mongoose';

const equipmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
    },
    /*user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Référence au modèle User
        required: true // Optionnel, mais peut être utile pour s'assurer que chaque équipement est lié à un utilisateur
    }*/
}, {
    timestamps: true
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;
