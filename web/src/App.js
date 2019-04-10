import React from "react";
import axios from "axios";
import _ from 'lodash';
import { Button } from "@material-ui/core";
import ParticipantApp from "./ParticipantApp";
import OrganizerApp from "./OrganizerApp";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMappings: {
        gameList: []
      },
      loginAsOrganizer: false
    };
  }

  async componentDidMount() {
    const gameMappings = (await axios.get("/games")).data;
    await this.setState({ gameMappings });
  }

  async updateGameMappings(userSelections, userName) {
    userSelections.forEach(gameIndex => {
      this.state.gameMappings.gameList[gameIndex].interestedPlayers.push(userName);
    });
    this.state.gameMappings.userList.push(userName);
    this.setState({ gameMappings: this.state.gameMappings });
    await axios.post("/games", { mappings: this.state.gameMappings });
  }

  async removeUser(userName) {
    this.state.gameMappings.gameList.forEach(game => {
      _.pull(game.interestedPlayers, userName);
    })
    _.pull(this.state.gameMappings.userList, userName);
    this.setState({ gameMappings: this.state.gameMappings });
    await axios.post("/games", { mappings: this.state.gameMappings });
  }

  async addGame() {
    // TODO
    return;
  }

  render() {
    
    console.log('gameMappings', this.state.gameMappings)
    return (
      <div className="app-container">
        <div className="app-header">
          <h3>Welcome to PA Game Night!</h3>
        </div>
        {this.state.loginAsOrganizer ? (
          <OrganizerApp
            gameMappings={this.state.gameMappings}
            removeUser={this.removeUser.bind(this)}
          />
        ) : (
          <ParticipantApp
            updateGameMappings={(userSelections, userName) => this.updateGameMappings(userSelections, userName)}
            gameMappings={this.state.gameMappings}
          />
        )}
        <Button
          color="primary"
          onClick={() => this.setState({ loginAsOrganizer: !this.state.loginAsOrganizer })}
        >
          {this.state.loginAsOrganizer ? "LOGIN AS PARTICIPANT" : "LOGIN AS ORGANIZER"}
        </Button>
      </div>
    );
  }
}
