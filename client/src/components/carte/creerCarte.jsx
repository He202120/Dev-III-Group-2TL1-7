import React from 'react';
import profilePic1 from "../../assets/joueurs/images2.jpg";
import profilePic2 from "../../assets/joueurs/images1.jpg";
import profilePic4 from "../../assets/joueurs/images4.jpg";
import '../../pages/cartes/infoJoueur/joueur1';

function Card({ name, firstName, speed, image, destinationUrl }) {
  return (
    <div className="card">
      <div className="card-content">
        {/* Ajoutez le lien autour de l'image */}
        <a href={destinationUrl}>
          <img className="card-image" src={image} alt="profile picture" />
        </a>
        <div className="player-info">
          <p>Nom: {name}</p>
          <p>Prénom: {firstName}</p>
        </div>
      </div>
    </div>
  );
}

export default function PlayerCards() {
  return (
    <div className="card-container">
      <Card name="zawil" firstName="will"  image={profilePic1} destinationUrl="./cartes/infoJoueur/joueur1" /> 
      <Card name="cascoute" firstName="jean"  image={profilePic2} destinationUrl="./cartes/infoJoueur/joueur2" />
      <Card name="akim" firstName="zelda"  image={profilePic4} destinationUrl="./cartes/infoJoueur/joueur3" />
    </div>
  );
}
