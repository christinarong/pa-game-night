import React from 'react';
import { IconButton, List, ListItem, ListItemText, Paper, ListItemSecondaryAction } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ResultsPage from './pages/ResultsPage';

export default class OrganizerApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMappings: this.props.gameMappings
    }
  }

  render() {
    return (
      <div className="organizer-content">
        <ResultsPage gameMappings={this.state.gameMappings}/>
        <div className="edit-controls">
          {this.renderUserList()}
          {this.renderAddNewGame()}
        </div>
      </div>
    )
  }
  
  renderUserList() {
    return (
      <Paper className="edit-userList">
        <List>
          {this.props.gameMappings.userList.map(userName => (
            <ListItem>
              <ListItemText>{userName}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => this.props.removeUser(userName)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  }

  renderAddNewGame() {
    return (
      <Paper className="edit-gameList">

      </Paper>
    )
  }
}