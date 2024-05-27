// src/PlayerStats.js

import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const generateRandomStats = (players) => {
  return players.map(player => ({
    name: player.name,
    goals: Math.floor(Math.random() * 30),
    assists: Math.floor(Math.random() * 20),
    matches: Math.floor(Math.random() * 40)
  }));
};

const PlayerStats = ({ users }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (users && users.length > 0) {
      setStats(generateRandomStats(users));
    }
  }, [users]);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>Football Player Statistics</Typography>
      <Grid container spacing={3}>
        {stats.map((player, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{player.name}</Typography>
                <Typography color="textSecondary">Goals: {player.goals}</Typography>
                <Typography color="textSecondary">Assists: {player.assists}</Typography>
                <Typography color="textSecondary">Matches: {player.matches}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: '2em' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Goals</TableCell>
              <TableCell align="right">Assists</TableCell>
              <TableCell align="right">Matches</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell align="right">{player.goals}</TableCell>
                <TableCell align="right">{player.assists}</TableCell>
                <TableCell align="right">{player.matches}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PlayerStats;
