import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyEditingRow: undefined
    };
  }

  generateRows(props) {
    let rows = [];
    this.props.gameMappings.gameList.forEach((gameInfo, gameKey) => {
      const playersList = gameInfo.interestedPlayers.join(", ");
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
    return (
      <Dialog
        open={this.state.currentlyEditingRow == row.id}
        onClose={() => this.setState({ currentlyEditingRow: undefined })}
      >
        <DialogTitle>Edit Users For {row.gameName}</DialogTitle>
        <DialogContent>
          <List>
            {this.props.gameMappings.gameList[row.id].interestedPlayers.map(userName => {
              return (
                <ListItem>
                  <ListItemText>{userName}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={() => this.props.deleteUserFromGame(userName, row.id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
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
                  <TableCell width={60}>
                    <IconButton aria-label="Edit" onClick={() => this.onEditButtonClicked(row.id)}>
                      <Edit />
                    </IconButton>
                    {this.renderRowDialog(row)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}