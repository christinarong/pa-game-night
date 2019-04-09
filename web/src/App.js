import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import ParticipantApp from "./ParticipantApp";
import OrganizerApp from "./OrganizerApp";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMappings: [],
      loginAsOrganizer: false
    };
  }

  async componentDidMount() {
    const gameMappings = (await axios.get("/games")).data;
    await this.setState({ gameMappings });
  }

  async updateGameMappings(userSelections, userName) {
    userSelections.forEach(gameIndex => {
      this.state.gameMappings[gameIndex].interestedPlayers.push(userName);
    });
    this.setState({ gameMappings: this.state.gameMappings });
    await axios.post("/games", { mappings: this.state.gameMappings });
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-header">
          <h3>Welcome to PA Game Night!</h3>
        </div>
        {this.state.loginAsOrganizer ? (
          <OrganizerApp gameMappings={this.state.gameMappings} />
        ) : (
          <ParticipantApp
            updateGameMappings={(userSelections, userName) =>
              this.updateGameMappings(userSelections, userName)
            }
            gameMappings={this.state.gameMappings}
          />
        )}
        <Button
          color="primary"
          onClick={() =>
            this.setState({ loginAsOrganizer: !this.state.loginAsOrganizer })
          }
        >
          {this.state.loginAsOrganizer
            ? "LOGIN AS PARTICIPANT"
            : "LOGIN AS ORGANIZER"}
        </Button>
      </div>
    );
  }
}
