import React, { useState } from 'react';
import axios from 'axios';

const EquipmentForm = () => {
    const [formData, setFormData] = useState({
        equipment: '',
        equipment_size: '',
        equipment_type: '',
        special_Request: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/orders', formData);
            console.log('Order submitted:', response.data);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="equipment">Équipement :</label>
            <select name="equipment" id="equipment" onChange={handleChange}>
                <option value="">Select Equipment</option>
                <option value="jersey_top_type">Maillot Haut</option>
                <option value="jersey_bottom_type">Maillot Bas</option>
                <option value="shin_guard">Protège-Tibia</option>
                <option value="socks">Chaussettes</option>
            </select>
            <br />

            <label htmlFor="equipment_size">Taille Équipement :</label>
            <select name="equipment_size" id="equipment_size" onChange={handleChange}>
                <option value="">Select Size</option>
                <option value="XXS">XXS</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="no">No</option>
            </select>
            <br />

            <label htmlFor="equipment_type">Type d'Équipement :</label>
            <select name="equipment_type" id="equipment_type" onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="training">Entraînement</option>
                <option value="match">Match</option>
                <option value="no">No</option>
            </select>
            <br />

            <label htmlFor="special_Request">Demande Particulière :</label>
            <textarea id="special_Request" name="special_Request" onChange={handleChange}></textarea>
            <br />

            <button type="submit">Envoyer</button>
            <button type="reset" onClick={() => setFormData({
                equipment: '',
                equipment_size: '',
                equipment_type: '',
                special_Request: ''
            })}>Rafraîchir</button>
        </form>
    );
};

export default EquipmentForm;
