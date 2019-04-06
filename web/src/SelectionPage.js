import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";

import GameCard from "./GameCard";

export default class SelectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = { gameMappings: {}, userSelections: [] };
  }

  async componentWillMount() {
    const gameMappings = (await axios.get("/games")).data;
    this.setState({ gameMappings });
  }

  render() {
    return (
      <div className="grid-container">
        {_.map(this.state.gameMappings, game => {
          return (
            <GameCard
              key={game.name}
              selected={this.state.userSelections.indexOf(game.name) !== -1}
              onSelect={value => this.onGameSelected(game.name, value)}
              cardInfo={game}
            />
          );
        })}
      </div>
    );
  }

  onGameSelected(gameName, selected) {
    let { userSelections } = this.state;
    if (selected) {
      userSelections.push(gameName);
    } else {
      _.pull(userSelections, gameName);
    }
    this.setState({ userSelections });
  }
}
