import React, { useState } from 'react';
import axios from 'axios';

const EquipmentForm = () => {
    const [formData, setFormData] = useState({
        jersey_top_type: '',
        jersey_top_size: '',
        jersey_bottom_type: '',
        jersey_bottom_size: '',
        shin_guard: '',
        socks: '',
        sock_size: '',
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
            <label htmlFor="jersey_top_type">Chaussette :</label>
            <select name="jersey_top_type" id="jersey_top_type" onChange={handleChange}>
                <option value="training">Training</option>
                <option value="match">Match</option>
                <option value="no">No</option>
            </select>
            <br />
            <label htmlFor="jersey_top_size">Taille Chaussette :</label>
            <select name="jersey_top_size" id="jersey_top_size" onChange={handleChange}>
                <option value="XXS">XXS</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="no">No</option>
            </select>
            <br />
            <label htmlFor="jersey_bottom_type">Maillot Haut :</label>
            <input type="text" id="jersey_bottom_type" name="jersey_bottom_type" onChange={handleChange} />
            <br />
            <label htmlFor="jersey_bottom_size">Maillot Bas :</label>
            <input type="text" id="jersey_bottom_size" name="jersey_bottom_size" onChange={handleChange} />
            <br />
            <label htmlFor="shin_guard">Protège :</label>
            <input type="text" id="shin_guard" name="shin_guard" onChange={handleChange} />
            <br />
            <label htmlFor="socks">Chaussettes :</label>
            <select name="socks" id="socks" onChange={handleChange}>
                <option value="training">Training</option>
                <option value="match">Match</option>
                <option value="no">No</option>
            </select>
            <br />
            <label htmlFor="sock_size">Taille Chaussette :</label>
            <select name="sock_size" id="sock_size" onChange={handleChange}>
                <option value="XXS">XXS</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="no">No</option>
            </select>
            <br />
            <label htmlFor="special_Request">Demande Particulière :</label>
            <textarea id="special_Request" name="special_Request" onChange={handleChange}></textarea>
            <br />
            <button type="submit">Envoyer</button>
            <button type="reset">Rafraîchir</button>
        </form>
    );
};

export default EquipmentForm;