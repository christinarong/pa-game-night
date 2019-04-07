import React from 'react';
import _ from "lodash";
import GameCard from "../gameCard/GameCard";

export default class RankingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameRanked1: null,
      gameRanked2: null,
      gameRanked3: null,
      currentlySelecting: 1
    }
  }

  render() {
    return (
      <div className="ranking-page-container">
        {_.forEach(this.props.userSelections, (gameName, index) => {
          const selectedGame = _.find(this.props.gameMappings, (game => game.name === gameName));
          return <div>{gameName}</div> // what's the best way to display this list?
        })}
      </div>
    )
  }
}