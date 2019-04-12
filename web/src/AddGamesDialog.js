import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";

export default class AddGamesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: {
        name: '',
        estimatedTime: '',
        numPlayers: '',
        rulesComplexity: '',
        type: '',
        description: '',
        year: '',
        bggRank: '',
        boxArtFile: '',
        interestedPlayers: []
      },
      errorMessage: null
    }
  };

  submitFormInput() {
    if (this.state.formInput.name && this.state.formInput.name.trim() !== '') {
      this.props.onAddGame(this.state.formInput);
      this.props.onClose();
    } else {
      this.setState({ errorMessage: 'Game name is required!'})
    }
  }

  render() {
    return (
      <Dialog className="dialog" fullWidth={true} maxWidth={"sm"} open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Add game to collection:</DialogTitle>
        <DialogContent className="edit-gameList">
          <TextField required className="input-field" margin="normal" variant="outlined"
            label="Name"
            value={this.state.formInput.name}
            error={this.state.errorMessage}
            onChange={event => {
              this.state.formInput.name = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="Estimated Play Time"
            value={this.state.formInput.estimatedTime}
            onChange={event => {
              this.state.formInput.estimatedTime = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="# of Players Allotted"
            value={this.state.formInput.numPlayers}
            onChange={event => {
              this.state.formInput.numPlayers = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="Rules Complexity"
            value={this.state.formInput.rulesComplexity}
            onChange={event => {
              this.state.formInput.rulesComplexity = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="Game Type"
            value={this.state.formInput.type}
            onChange={event => {
              this.state.formInput.type = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="Year"
            value={this.state.formInput.year}
            onChange={event => {
              this.state.formInput.year = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="BoardGameGeek.com Ranking"
            value={this.state.formInput.bggRank}
            onChange={event => {
              this.state.formInput.bggRank = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined" multiline={true}
            label="Description"
            value={this.state.formInput.description}
            onChange={event => {
              this.state.formInput.description = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <p style={{color: 'red'}}>{this.state.errorMessage ? `Error: ${this.state.errorMessage}` : null}</p>
          <Button className="button" variant="contained" color="primary" onClick={this.submitFormInput.bind(this)}>
            ADD GAME
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
}