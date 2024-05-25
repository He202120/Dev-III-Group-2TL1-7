import React from 'react';
import profilePic1 from "../../../assets/joueurs/images2.jpg";
import imgjoueur1 from "../../../assets/imageJoueur/red.jpg"
import imgjoueur2 from "../../../assets/imageJoueur/yellow.jpg"
import imgjoueur3 from "../../../assets/imageJoueur/watch.jpg"
import './joueur1.css'

const joueur1 = () => {
    return (
        <div>
            {/* Utilisez des accolades pour référencer profilePic1 comme une variable */}
            <img className="card-image" src={profilePic1} alt="profile picture" />
            <p> Nom: zawill</p><br></br>
            <p>Preno: will </p><br></br>
            <p>Nationalité: Belge</p>

        
            <div className='infoJouer'>
                <table>
                    <tr>
                        <th>&nbsp;</th>
                        <th>championant</th>
                        <th>coupe</th>
                        <th>match amical</th>
                        <th>Total</th>
                    </tr>
                    
                    <tr>
                        <th><img src={imgjoueur1}/></th>
                        <td>2</td>
                        <td>3</td>
                        <td>1</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <th><img src={imgjoueur2}/></th>
                        <td>1</td>
                        <td>7</td>
                        <td>12</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <th><img src={imgjoueur3}/></th>
                        <td>320</td>
                        <td>300</td>
                        <td>450</td>
                        <td>1070</td>
                    </tr>
                   
                </table>
            </div>
        </div>
    );
}

export default joueur1;
