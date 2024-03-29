import React, { useEffect, useState } from 'react';

//Axios est utilisé pour faire des requêtes à l'API
import axios from 'axios';

function Liste_membre(){
    const [list, setData] = useState([]);
    useEffect(() => {
            axios.get("http://localhost:8000/gestionnaire")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    
    return(
        <table class="listeStyle">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Poste principale</th>
                    <th>Côté</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        
        </ table>
    );
}

export default Liste_membre;