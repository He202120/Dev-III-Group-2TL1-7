import React from 'react';


function Magasin() {
    return (
        <div>
            <h1>//////////////////////////////</h1>
            <form action="/submit-form" method="POST">
            <div className="form-group">
                    <label htmlFor="outfit">Outfit :</label>
                    <select id="outfit" name="outfit" required="true">
                        <option value="">--Please choose an option--</option>
                        <option value="match">Match Jersey</option>
                        <option value="training">Training Jersey</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="outfitSize">Outfit Size:</label>
                    <select id="outfitSize" name="outfitSize"required="true" >
                        <option value="">--Please choose an option--</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="s">S</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="socks">Socks:</label>
                    <select id="socks" name="socks"required="true">
                        <option value="">--Please choose an option--</option>
                        <option value="training">Training Sock</option>
                        <option value="match">Sock Match</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="sockSize">Sock Size:</label>
                    <select id="sockSize" name="sockSize"required="true">
                        <option value="">--Please choose an option--</option>
                        <option value="37-39">37-39</option>
                        <option value="40-41">40-41</option>
                        <option value="42-44">42-44</option>
                        <option value="45-47">45-47</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="preferenceSocks">Preference Socks:</label>
                    <select id="preferenceSocks" name="preferenceSocks"required="true">
                        <option value="">--Please choose an option--</option>
                        <option value="short">Short</option>
                        <option value="long">Long</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="preferenceOutfit">Preference Outfit:</label>
                    <select id="preferenceOutfit" name="preferenceOutfit"required="true">
                        <option value="">--Please choose an option--</option>
                        <option value="short">Short</option>
                        <option value="long">Long</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="kneePad">Knee Pad:</label>
                    <select id="kneePad" name="kneePad"required="true">
                        <option value="">--Please choose an option--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="shinGuard">Shin Guard:</label>
                    <select id="shinGuard" name="shinGuard"required="true">
                        <option value="">--Please choose an option--</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <input type="submit" value="Submit" />
                <input type="reset" value="Reset" />
            </form>
        </div>
    );
}

export default Magasin;

