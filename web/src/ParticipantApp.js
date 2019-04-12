import React from 'react';
import { Button, Step, Stepper, StepLabel, TextField } from '@material-ui/core';
import GameCard from './gameCard/GameCard';
import ResultsPage from './pages/ResultsPage';
import ParticipantAppService from './ParticipantAppService';

export default class ParticipantApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      errorMessage: null,
      userName: null,
      userSelections: new Map()
    };
    this.steps = ['Register', 'Select Games', 'Results'];

    for (let func in ParticipantAppService) this[func] = ParticipantAppService[func].bind(this);
  }

  render() {
    return (
      <div className="participant-content">
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {this.steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {this.getStepperContent()}
      </div>
    )
  }

  renderLoginPage() {
    const checkUserName = () => {
      if (!this.state.userName || this.state.userName === '') this.setState({ errorMessage: 'Name is required!'});
      else if (this.props.gameMappings.userList.includes(this.state.userName)) this.setState({ errorMessage: 'A user with that name already exists! Consider adding a middle name or numbers to make it unique.'});
      else this.goToNextStep();
    };
    
    return (
      <div className="landing-page-container">
        <div>Please provide your full name!</div>
        <TextField
          className="nameField"
          required
          margin="normal"
          variant="outlined"
          onChange={event => this.setState({ userName: event.target.value })}
        />
        {this.renderStepperControls(checkUserName)}
      </div>
    );
  }

  renderSelectionPage() {
    const checkSelections = () => {
      const userRankings = Array.from(this.state.userSelections.values());
      if ((userRankings.length === 1 && userRankings.includes(1))
        || (userRankings.length === 2 && userRankings.includes(1) && userRankings.includes(2))
        || (userRankings.length === 3 && userRankings.includes(1) && userRankings.includes(2) && userRankings.includes(3))) {
        this.submitInfo();
        this.goToNextStep();
      }
      else this.setState({ errorMessage: 'Users must select between one and three games, numbering their preferences sequentially starting from one.'});
    };
    
    const resetFields = () => this.setState({ userName: null, userSelections: new Map() });

    return (
      <div className="selection-page-container">
        <div className="grid-container">
          {this.props.gameMappings.gameList.map((gameInfo, gameKey) => {
            return (
              <GameCard
                key={gameKey}
                onSelect={gameRanking => this.onGameSelected(gameKey, gameRanking)}
                cardInfo={gameInfo}
              />
            );
          })}
        </div>
        {this.renderStepperControls(checkSelections, resetFields)}
      </div>
    );
  }

  renderEndPage() {
    return (
      <div className="submission-page-container">
        <p>Successfully Submitted!</p>
        <ResultsPage
          gameMappings={this.props.gameMappings}
          loginAsOrganizer={false}
          deleteUserFromGame={(userName, gameIndex) => this.props.deleteUserFromGame(userName, gameIndex)}
        />
        <Button className="button" variant="contained" color="primary" onClick={this.restartApp}>
          REGISTER NEW PARTICIPANT
        </Button>
      </div>
    )
  }

  renderStepperControls(moveForward, moveBackward) {
    const checkAndMoveForward = () => {
      this.setState({ errorMessage: null });
      moveForward();
    };

    const checkAndMoveBackward = () => {
      this.setState({ errorMessage: null });
      moveBackward();
      this.goToPrevStep();
    };

    return (
      <div className="stepper-controls">
        <p style={{color: 'red'}}>{this.state.errorMessage ? `Error: ${this.state.errorMessage}` : null}</p>
        <Button
          className="button"
          variant="contained"
          color="inherit"
          disabled={this.state.activeStep === 0 || this.state.activeStep === this.steps.length - 1}
          onClick={checkAndMoveBackward}
        >
          PREV
        </Button>
        <Button
          className="button"
          variant="contained"
          color="primary"
          disabled={this.state.activeStep === this.steps.length - 1}
          onClick={checkAndMoveForward}
        >
          {this.state.activeStep === this.steps.length - 2 ? 'SUBMIT' : 'NEXT'}
        </Button>
      </div>
    );
  }
}
