import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import GameMedia from "./GameMedia";

export default function GameCard(props) {
  let { cardInfo, onSelect, selected } = props;
  return (
    <div className="game-card-container">
      <Card style={{ maxWidth: "300px" }}>
        <CardActionArea onClick={() => onSelect(!selected)}>
          <CardMedia
            selected={selected}
            style={{ width: "300px", height: "200px" }}
            image={require(`./box-art/${cardInfo.boxArtFile}`)}
            component={GameMedia}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {cardInfo.name}
            </Typography>
            <Typography component="p">{`estimated play time: ${
              cardInfo.estimatedTime
            }`}</Typography>
            <Typography component="p">{`# of players: ${
              cardInfo.numPlayers
            }`}</Typography>
            <Typography component="p">{`rules complexity: ${
              cardInfo.rulesComplexity
            }`}</Typography>
            <Typography component="p">{`game type: ${
              cardInfo.type
            }`}</Typography>
            <Typography component="p">{`description: ${
              cardInfo.description
            }`}</Typography>
            <Typography component="p">{`# people interested: ${
              cardInfo.numInterested
            }`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
