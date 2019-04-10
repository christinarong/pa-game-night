import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import GameMedia from "./GameMedia";

export default class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gameRanking: 0};
  }

  onClick() {
    const newRank = (this.state.gameRanking + 1) % 4;
    this.setState({gameRanking: newRank});
    this.props.onSelect(newRank);
  }

  render() {
  return (
    <div className="game-card-container">
      <Card style={{ maxWidth: "300px" }}>
        <CardActionArea onClick={this.onClick.bind(this)}>
          <CardMedia
            style={{ width: "300px", height: "200px" }}
            image={require(`../boxArt/${this.props.cardInfo.boxArtFile}`)}
            gameRanking={this.state.gameRanking}
            component={GameMedia}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.cardInfo.name}
            </Typography>
            <Typography component="p">
              <strong>estimated play time:</strong> {this.props.cardInfo.estimatedTime}
            </Typography>
            <Typography component="p">
              <strong># of players:</strong> {this.props.cardInfo.numPlayers}
            </Typography>
            <Typography component="p">
              <strong>rules complexity:</strong> {this.props.cardInfo.rulesComplexity}
            </Typography>
            <Typography component="p">
              <strong>game type:</strong> {this.props.cardInfo.type}
            </Typography>
            <Typography component="p">
              <strong>description:</strong> {this.props.cardInfo.description}
            </Typography>
            <Typography component="p">
              <strong># people interested:</strong> {this.props.cardInfo.interestedPlayers.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
  }
}



// export default function GameCard(props) {
//   let { cardInfo, onSelect, selected } = props;
//   return (
//     <div className="game-card-container">
//       <Card style={{ maxWidth: "300px" }}>
//         <CardActionArea onClick={() => onSelect(!selected)}>
//           <CardMedia
//             selected={selected}
//             style={{ width: "300px", height: "200px" }}
//             image={require(`../boxArt/${cardInfo.boxArtFile}`)}
//             component={GameMedia}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               {cardInfo.name}
//             </Typography>
//             <Typography component="p">
//               <strong>estimated play time:</strong> {cardInfo.estimatedTime}
//             </Typography>
//             <Typography component="p">
//               <strong># of players:</strong> {cardInfo.numPlayers}
//             </Typography>
//             <Typography component="p">
//               <strong>rules complexity:</strong> {cardInfo.rulesComplexity}
//             </Typography>
//             <Typography component="p">
//               <strong>game type:</strong> {cardInfo.type}
//             </Typography>
//             <Typography component="p">
//               <strong>description:</strong> {cardInfo.description}
//             </Typography>
//             <Typography component="p">
//               <strong># people interested:</strong> {cardInfo.interestedPlayers.length}
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     </div>
//   );
// }
