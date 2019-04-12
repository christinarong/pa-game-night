import React from "react";
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IconButton, Paper, Typography } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentlyEditingRow: undefined };
  }

  generateRows(props) {
    let rows = [];
    this.props.gameMappings.gameList.forEach((gameInfo, gameKey) => {
      const playersList = gameInfo.interestedPlayers.map(player => player.userName + " (" + player.gameRanking + ")").join(', ') || "";
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

  renderRowDialog(row) {
    console.log(this.props.gameMappings.gameList[1].interestedPlayers.length)
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={this.state.currentlyEditingRow == row.id}
        onClose={() => this.setState({ currentlyEditingRow: undefined })}
      >
        <DialogTitle>Edit player list: <strong>{row.gameName}</strong></DialogTitle>
        <DialogContent>
          {this.props.gameMappings.gameList[row.id].interestedPlayers.length > 0
            ? <List dense={true}>
                {this.props.gameMappings.gameList[row.id].interestedPlayers.map((user, playerIndex) => {
                  return (
                    <ListItem>
                      <ListItemText>{user.userName}</ListItemText>
                      <IconButton aria-label="Delete" onClick={() => this.props.deleteUserFromGame(playerIndex, row.id)}>
                        <Delete />
                      </IconButton>
                    </ListItem>
                  );
                })}
              </List>
            : <Typography>No users to display.</Typography>
          }
        </DialogContent>
      </Dialog>
    );
  }

  onEditButtonClicked(rowId) {
    this.setState({ currentlyEditingRow: rowId });
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
              {this.props.loginAsOrganizer ? (
                <TableCell>EDIT</TableCell>
              ) : null }
            </TableHead>
            <TableBody>
              {rowsToDisplay.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.gameName}
                  </TableCell>
                  <TableCell>{row.playersAllowed}</TableCell>
                  <TableCell>{row.numInterested}</TableCell>
                  <TableCell>{row.namesInterested}</TableCell>
                  {this.props.loginAsOrganizer ? (
                    <TableCell width={100}>
                      <IconButton aria-label="Edit" onClick={() => this.onEditButtonClicked(row.id)}>
                        <Edit />
                      </IconButton>
                      {this.renderRowDialog(row)}
                    </TableCell>
                  ) : null }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
