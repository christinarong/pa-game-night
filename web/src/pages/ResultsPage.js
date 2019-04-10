import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  generateRows(props) {
    let rows = [];
    this.props.gameMappings.gameList.forEach((gameInfo, gameKey) => {
      const playersList = gameInfo.interestedPlayers.join(', ');
      rows.push({
        id: gameKey,
        gameName: gameInfo.name,
        playersAllowed: gameInfo.numPlayers,
        numInterested: gameInfo.interestedPlayers.length,
        namesInterested: playersList
      });
    });
    return rows;
  }

  render() {
    const rowsToDisplay = this.generateRows();
    return (
      <div className="results-page-container">
        <Paper>
          <Table>
            <TableHead>
              <TableCell>Game</TableCell>
              <TableCell>Players Allotted</TableCell>
              <TableCell># of People Interested</TableCell>
              <TableCell>List of People Interested</TableCell>
            </TableHead>
            <TableBody>
              {rowsToDisplay.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.gameName}</TableCell>
                  <TableCell>{row.playersAllowed}</TableCell>
                  <TableCell>{row.numInterested}</TableCell>
                  <TableCell>{row.namesInterested}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}