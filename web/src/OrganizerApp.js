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
        <ResultsPage deleteUserFromGame={(userName, gameIndex) => this.props.deleteUserFromGame(userName, gameIndex)} gameMappings={this.props.gameMappings} />
        <div className="edit-controls">
          <Button onClick={() => this.setState({ openDialog: "editUsers" })}>Edit Users</Button>
          <Button onClick={() => this.setState({ openDialog: "addGames" })}>Add Games</Button>
          <EditUsersDialog
            userList={this.props.gameMappings.userList}
            onClose={() => this.onDialogClose()}
            onDeleteUser={userName => this.props.removeUser(userName)}
            open={this.state.openDialog == "editUsers"}
          />
          <AddGamesDialog
            onClose={() => this.onDialogClose()}
            onAddGame={this.props.addGame}
            open={this.state.openDialog == "addGames"}
          />
          <div onClose={() => this.onDialogClose} open={this.state.openDialog == "addGames"} />
        </div>
      </div>
    );
  }
}
