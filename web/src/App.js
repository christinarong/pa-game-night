import React from "react";
import axios from "axios";
import _ from "lodash";
import { Button } from "@material-ui/core";
import ParticipantApp from "./ParticipantApp";
import OrganizerApp from "./OrganizerApp";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMappings: {
        gameList: [],
        userList: []
      },
      loginAsOrganizer: false
    };
  }

  async componentDidMount() {
    const gameMappings = (await axios.get("/games")).data;
    await this.setState({ gameMappings });
  }

  async updateGameMappings(userSelections, userName) {
    userSelections.forEach((gameRanking, gameIndex) => {
      this.state.gameMappings.gameList[gameIndex].interestedPlayers.push({userName, gameRanking});
    });
    this.state.gameMappings.userList.push(userName);
    this.setState({ gameMappings: this.state.gameMappings });
    await axios.post("/games", { mappings: this.state.gameMappings });
  }

  async removeUser(userName) {
    this.state.gameMappings.gameList.forEach(game => {
      game.interestedPlayers = _.filter(game.interestedPlayers, user => user.userName !== userName);
    });
    _.pull(this.state.gameMappings.userList, userName);
    this.setState({ gameMappings: this.state.gameMappings });
    await axios.post("/games", { mappings: this.state.gameMappings });
  }

  async deleteUserFromGame(playerIndex, gameIndex) {
    _.pullAt(this.state.gameMappings.gameList[gameIndex].interestedPlayers, playerIndex);
    this.setState({ gameMappings: this.state.gameMappings });
    await axios.post("/games", { mappings: this.state.gameMappings });
  }

  async addGame(gameObject) {
    this.state.gameMappings.gameList.push(gameObject);
    await axios.post("/games", { mappings: this.state.gameMappings });
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-header">
          <h3>Welcome to PA Game Night!</h3>
        </div>
        {this.state.loginAsOrganizer
          ? <OrganizerApp
              gameMappings={this.state.gameMappings}
              removeUser={this.removeUser.bind(this)}
              deleteUserFromGame={this.deleteUserFromGame.bind(this)}
              addGame={this.addGame.bind(this)}
            />
          : <ParticipantApp
              gameMappings={this.state.gameMappings}
              updateGameMappings={(userSelections, userName) => this.updateGameMappings(userSelections, userName)}
              deleteUserFromGame={this.deleteUserFromGame.bind(this)}
            />
        }
        <Button className="button" color="primary" onClick={() => this.setState({ loginAsOrganizer: !this.state.loginAsOrganizer })}>
          {this.state.loginAsOrganizer ? "PARTICIPANT VIEW" : "ORGANIZER VIEW"}
        </Button>
      </div>
    );
  }
}
