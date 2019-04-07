import React from "react";
import _ from "lodash";
import GameCard from "../gameCard/GameCard";

export default class SelectionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { userSelections: [] };
  }

  onGameSelected(gameName, isSelected) {
    if (isSelected) {
      this.state.userSelections.push(gameName);
    } else {
      _.pull(this.state.userSelections, gameName);
    }
    this.setState({ userSelections: this.state.userSelections });
    this.props.userSelectionsChanged(this.state.userSelections);
  }

  render() {
    return (
      <div className="grid-container">
        {_.map(this.props.gameMappings, (game, index) => {
          return (
            <GameCard
              key={index}
              selected={this.state.userSelections.indexOf(game.name) !== -1}
              onSelect={isSelected => this.onGameSelected(game.name, isSelected)}
              cardInfo={game}
            />
          );
        })}
      </div>
    );
  }
}
