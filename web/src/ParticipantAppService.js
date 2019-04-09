import React from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SelectionPage from './pages/SelectionPage';
import ResultsPage from './pages/ResultsPage';

export default {
  getStepperContent,

  goToPrevStep,
  goToNextStep,
  moveForward,
  moveBackward,
  
  updateInterestedPlayers,
  submitSelections
}

function getStepperContent() {
  const userNameChanged = userName => this.setState({ userName });
  const userSelectionsChanged = userSelections => this.setState({ userSelections });
  switch(this.state.activeStep) {
    case 0: return <LoginPage userNameChanged={userNameChanged}/>;
    case 1: return <SelectionPage gameMappings={this.props.gameMappings} userSelectionsChanged={userSelectionsChanged}/>;
    case 2: return (
      <div className="submission-page-container">
        <p>Successfully Submitted!</p>
        <ResultsPage gameMappings={this.props.gameMappings}/>
      </div>
    )
    default: break;
  }
}

function goToPrevStep() {
  this.setState({ activeStep: this.state.activeStep - 1 });
}

function goToNextStep() {
  this.setState({ activeStep: this.state.activeStep + 1 });
}

function moveBackward() {
  this.setState({ errorMessage: null });
  switch(this.state.activeStep - 1) {
    case 0: {
      this.setState({ userName: null, userSelections: [] });
      break;
    }
    case 1: {
      this.setState({ userSelections: [] });
      break;
    }
    case 2: break;
    default: break;
  }
  this.goToPrevStep();
}

function moveForward() {
  this.setState({ errorMessage: null });
  switch(this.state.activeStep) {
    case 0: {
      if (this.state.userName && this.state.userName !== '') this.goToNextStep();
      else this.setState({ errorMessage: 'Name is required!'});
      break;
    }
    case 1: {
      if (this.state.userSelections.length > 0) {
        this.updateInterestedPlayers();
        this.goToNextStep();
      }
      else this.setState({ errorMessage: 'Must select at least one game!'});
      break;
    }
    case 2: break;
    default: break;
  }
}

function updateInterestedPlayers() {
  this.state.userSelections.forEach(gameIndex => {
    this.props.gameMappings[gameIndex].interestedPlayers.push(this.state.userName);
  })
  this.setState({ gameMappings: this.props.gameMappings });
}

function submitSelections() {
  // axios.post('/games', this.state.gameMappings);
}