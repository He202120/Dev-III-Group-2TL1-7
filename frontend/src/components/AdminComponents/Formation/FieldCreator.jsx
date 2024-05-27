import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "60px", // Hauteur fixe pour chaque élément
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const FootballFormation = ({ teamBuild }) => {
  if (!teamBuild || teamBuild.length === 0) {
    // Gestion du cas où teamBuild est vide ou non défini
    return <div>No team build data available</div>;
  }

  const { keeper, defender, middle, attacker } = teamBuild[0];

  const renderGrid = (role, count) => {
    return (
      <Grid container item xs={12} spacing={2} justifyContent="center">
        {[...Array(count)].map((_, index) => (
          <Grid item xs={2} key={index}>
            <Item>
              {role} {index + 1}
              <div>{teamBuild[0][role][index]}</div>
            </Item>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} sx={{ textAlign: "center" }}>
      {renderGrid("attacker", attacker.length)}
      {renderGrid("middle", middle.length)}
      {renderGrid("defender", defender.length)}
      {renderGrid("keeper", keeper.length)}
    </Grid>
  );
};

export default FootballFormation;
