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
          <EditUsersDialog
            onClose={() => this.onDialogClose()}
            open={this.state.openDialog == "editUsers"}
            onRemoveUser={userName => this.props.removeUser(userName)}
            userList={this.props.gameMappings.userList}
          />
          <AddGamesDialog
            onClose={() => this.onDialogClose()}
            open={this.state.openDialog == "addGames"}
            onAddGame={this.props.addGame}
          />
          {/* <div onClose={() => this.onDialogClose} open={this.state.openDialog == "addGames"} /> */}
        </div>
      </div>
    );
  }
}
