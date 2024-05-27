import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FootballFormation from "../AdminComponents/Formation/FieldCreator";


const DisplayFormSelected = ({ users }) => {

  const [data, setData] = useState([]);
  const [teamBuild, setTeamBuild] = useState([]);

  useEffect(() => {
    if (Array.isArray(users)) {
      setData(users);
    }
  }, [users]);

  useEffect(() => {
    if (data.length > 0) {
      try {
        const tableEquipe = JSON.parse(data[0].team);
        if (Array.isArray(tableEquipe)) {
          const { defender, attacker, middle, keeper } = tableEquipe.reduce((acc, obj) => {
            if (obj.position === 'defender') {
              acc.defender.push(obj.name);
            } else if (obj.position === 'attacker') {
              acc.attacker.push(obj.name);
            } else if (obj.position === 'middle') {
              acc.middle.push(obj.name);
            } else if (obj.position === 'keeper') {
              acc.keeper.push(obj.name);
            }
            return acc;
          }, { defender: [], attacker: [], middle: [], keeper: [] });

          const newTeam = {
            keeper,
            defender,
            middle,
            attacker,
          };

          // Met à jour teamBuild avec le nouvel objet
          setTeamBuild([newTeam]);
        } else {
          console.error('Parsed team data is not an array');
        }
      } catch (error) {
        console.error('Error parsing team data:', error);
      }
    }
  }, [data]);

  useEffect(() => {
    if (teamBuild.length > 0){
    }
  })

  if (data.length === 0) {
    return <p>Loading...</p>; // ou un indicateur de chargement
  }

  return (
    <FootballFormation teamBuild={teamBuild} />
  );
};

export default DisplayFormSelected;
