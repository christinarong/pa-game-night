import React, { Component } from 'react';
import GameCard from './GameCard';

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.setState({ gameList: [] });
  }

  componentWillMount() {
    const gameList = [
      { name: 'Scrabble', boxArtFile: 'scrabble.jpg', estimatedTime: '1 hour', numPlayers: '2-4', rulesComplexity: 'easy', type: 'word', description: 'fun word game', peopleInterested: [] }
    ];

    this.setState({ gameList });
  }

  render() {
    return (
      <div className="grid-container">
        {this.state.gameList.map(game => {
          return (
            <GameCard
              name={game.name}
              boxArtFile={game.boxArtFile}
              estimatedTime={game.estimatedTime}
              numPlayers={game.numPlayers}
              rulesComplexity={game.rulesComplexity}
              type={game.type}
              description={game.description}
              numInterested={game.peopleInterested.length}
            />
          )
        })}
      </div>
    )
  }

}