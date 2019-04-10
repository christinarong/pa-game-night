import React from "react";
import { IconButton, Button, List, ListItem, ListItemText, Paper, ListItemSecondaryAction } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import ResultsPage from "./pages/ResultsPage";
import { EditUsersDialog } from "./Dialog";

export default class OrganizerApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: undefined
    };
  }

  onEditUsersButtonClick() {
    this.setState({ openDialog: "editUsers" });
  }

  onAddGamesButtonClick() {
    this.setState({ openDialog: "addGames" });
  }

  onDialogClose() {
    this.setState({ openDialog: undefined });
  }

  render() {
    return (
      <div className="organizer-content">
        <ResultsPage gameMappings={this.props.gameMappings} />
        <div className="edit-controls">
          <Button onClick={() => this.setState({ openDialog: "editUsers" })}>Edit Users</Button>
          <Button onClick={() => this.setState({ openDialog: "addGames" })}>Add Games</Button>
          <EditUsersDialog
            userList={this.props.gameMappings.userList}
            onClose={() => this.onDialogClose()}
            onDeleteUser={userName => this.props.removeUser(userName)}
            open={this.state.openDialog == "editUsers"}
          />
          <div onClose={() => this.onDialogClose} open={this.state.openDialog == "addGames"} />
        </div>
      </div>
    );
  }

  renderUserList() {
    return (
      <Paper className="edit-userList">
        <div>Users</div>
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
    );
  }

  renderAddNewGame() {
    return <Paper className="edit-gameList" />;
  }
}
