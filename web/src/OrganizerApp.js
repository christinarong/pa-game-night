import React from "react";
import { Button } from "@material-ui/core";
import ResultsPage from "./pages/ResultsPage";
import AddGamesDialog from './AddGamesDialog';
import { EditUsersDialog } from "./EditUsersDialog";

export default class OrganizerApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { openDialog: undefined };
  }

  onDialogClose() {
    this.setState({ openDialog: undefined });
  }

  render() {
    return (
      <div className="organizer-content">
        <ResultsPage
          gameMappings={this.props.gameMappings}
          loginAsOrganizer={true}
          deleteUserFromGame={(userName, gameIndex) => this.props.deleteUserFromGame(userName, gameIndex)}
        />
        <div className="edit-controls">
          <Button className="button" variant="outlined" color="secondary" onClick={() => this.setState({ openDialog: "editUsers" })}>Edit Users</Button>
          <Button className="button" variant="outlined" color="secondary" onClick={() => this.setState({ openDialog: "addGames" })}>Add Games</Button>
          {this.renderDialog(this.state.openDialog)}
        </div>
      </div>
    );
  }

  renderDialog(openDialog) {
    switch(openDialog) {
      case 'editUsers':
        return (
          <EditUsersDialog
            onClose={() => this.onDialogClose()}
            open={true}
            onRemoveUser={userName => this.props.removeUser(userName)}
            userList={this.props.gameMappings.userList}
          />
        );
      case 'addGames':
        return (
          <AddGamesDialog
            onClose={() => this.onDialogClose()}
            open={true}
            onAddGame={this.props.addGame}
          />
        );
      case undefined:
        return null;
    }
  }
}
