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

    //Trier sur nom puis prénom
    list.sort((a,b) => {
        if (a.nom > b.nom){
            return 1;
        }else if (a.nom < b.nom){
            return -1;
        }else if (a.prenom > b.prenom){
            return 1;
        }else if (a.prenom < b.prenom){
            return -1;
        }else{
            return 0;
        }
    });

    const members_list = list.map(person => <tr><td>{person.nom}</td><td>{person.prenom}</td><td>{person.poste}</td><td>{person.status}</td><td><button>Infos</button></td></tr>);

    
    return(
        <div className="wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Poste</th>
                        <th>Status</th>
                        <th>Profil</th>
                    </tr>
                </thead>
                <tbody>
                    {members_list}
                </tbody>
                <caption>
                    Joueurs & staff
                </caption>
            </ table>
        </div>
    );
}

export default Liste_membre;