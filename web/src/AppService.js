import React from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SelectionPage from './pages/SelectionPage';
import RankingPage from './pages/RankingPage';

export default {
  getStepperContent,
  goToPrevStep,
  goToNextStep,
  moveForward,
  moveBackward,
  submitSelections
}

function getStepperContent() {
  const userNameChanged = userName => this.setState({ userName });
  const userSelectionsChanged = userSelections => this.setState({ userSelections });
  switch(this.state.activeStep) {
    case 0: return <LoginPage userNameChanged={userNameChanged}/>;
    case 1: return <SelectionPage gameMappings={this.state.gameMappings} userSelectionsChanged={userSelectionsChanged}/>;
    case 2: return <RankingPage gameMappings={this.state.gameMappings} userSelections={this.state.userSelections}/>;
    case 3: return <div>Successfully Submitted!</div>;
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
    case 3: break;
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
      if (this.state.userSelections.length > 0) this.goToNextStep();
      else this.setState({ errorMessage: 'Must select at least one game!'});
      break;
    }
    case 2: {
      // this.submitSelections();
      this.goToNextStep();
      break;
    }
    case 3: break;
    default: break;
  }
}

function submitSelections() {
  this.state.userSelections.forEach(gameIndex => {
    this.state.gameMappings[gameIndex].interestedPlayers.push(this.state.userName);
  })
  // axios.post('/games', this.state.gameMappings);
}