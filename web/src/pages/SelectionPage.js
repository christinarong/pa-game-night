// import React from "react";
// import _ from "lodash";
// import GameCard from "../gameCard/GameCard";

// export default class SelectionPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { userSelections: [] };
//   }

//   onGameSelected(gameKey, isSelected) {
//     if (isSelected) this.state.userSelections.push(gameKey);
//     else _.pull(this.state.userSelections, gameKey);
//     this.setState({ userSelections: this.state.userSelections });
//     this.props.userSelectionsChanged(this.state.userSelections);
//   }

//   render() {
//     return (
//       <div className="grid-container">
//         {this.props.gameMappings.map((gameInfo, gameKey) => {
//           return (
//             <GameCard
//               key={gameKey}
//               selected={this.state.userSelections.indexOf(gameKey) !== -1}
//               onSelect={isSelected => this.onGameSelected(gameKey, isSelected)}
//               cardInfo={gameInfo}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }
