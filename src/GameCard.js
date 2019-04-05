import React, { Component } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

export default class GameCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="game-card-container">
        <Card style={{maxWidth: '300px'}}>
          <CardActionArea>
            <CardMedia
              style={{width: '300px', height: '200px'}}
              image={require(`./box-art/${this.props.boxArtFile}`)}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{this.props.name}</Typography>
              <Typography component="p">{`estimated play time: ${this.props.estimatedTime}`}</Typography>
              <Typography component="p">{`# of players: ${this.props.numPlayers}`}</Typography>
              <Typography component="p">{`rules complexity: ${this.props.rulesComplexity}`}</Typography>
              <Typography component="p">{`game type: ${this.props.type}`}</Typography>
              <Typography component="p">{`description: ${this.props.description}`}</Typography>
              <Typography component="p">{`# people interested: ${this.props.numInterested}`}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{float: 'right'}}>
            <Button>SELECT</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

}