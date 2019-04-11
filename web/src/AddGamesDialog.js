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
        bbgRank: '',
        boxArtFile: '',
        interestedPlayers: []
      }
    }
  };

  submitFormInput() {
    this.props.onAddGame(this.state.formInput);
    this.props.onClose();
  }

  render() {
    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Add Game</DialogTitle>
        <DialogContent className="edit-gameList">
          <TextField required className="input-field" margin="normal" variant="outlined"
            label="name"
            value={this.state.formInput.name}
            onChange={event => {
              this.state.formInput.name = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="estimated play time"
            value={this.state.formInput.estimatedTime}
            onChange={event => {
              this.state.formInput.estimatedTime = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="# of players allotted"
            value={this.state.formInput.numPlayers}
            onChange={event => {
              this.state.formInput.numPlayers = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="rules complexity"
            value={this.state.formInput.rulesComplexity}
            onChange={event => {
              this.state.formInput.rulesComplexity = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="game type"
            value={this.state.formInput.type}
            onChange={event => {
              this.state.formInput.type = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="year"
            value={this.state.formInput.year}
            onChange={event => {
              this.state.formInput.year = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined"
            label="bbgRank"
            value={this.state.formInput.bbgRank}
            onChange={event => {
              this.state.formInput.bbgRank = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <TextField className="input-field" margin="normal" variant="outlined" multiline={true}
            label="description"
            value={this.state.formInput.description}
            onChange={event => {
              this.state.formInput.description = event.target.value;
              this.setState({ formInput: this.state.formInput });
            }}
          />
          <Button variant="contained" color="primary" onClick={this.submitFormInput.bind(this)}>
            ADD GAME
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
}