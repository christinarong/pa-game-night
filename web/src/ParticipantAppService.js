import axios from 'axios';
import _ from 'lodash';

export default {
  getStepperContent,

  goToPrevStep,
  goToNextStep,

  onGameSelected,
  
  restartApp, 
  submitInfo
}

function getStepperContent() {
  switch(this.state.activeStep) {
    case 0: return this.renderLoginPage();
    case 1: return this.renderSelectionPage();
    case 2: return this.renderEndPage();
    default: break;
  }
}

function goToPrevStep() {
  this.setState({ activeStep: this.state.activeStep - 1 });
}

function goToNextStep() {
  this.setState({ activeStep: this.state.activeStep + 1 });
}

function onGameSelected(gameKey, gameRank) {
  if (gameRank !== 0) this.state.userSelections.set(gameKey, gameRank);
  else this.state.userSelections.delete(gameKey);
  this.setState({ userSelections: this.state.userSelections });
}

function restartApp() {
  this.setState({
    activeStep: 0,
    errorMessage: null,
    userName: null,
    userSelections: new Map()
  })
}

function submitInfo() {
  this.props.updateGameMappings(this.state.userSelections, this.state.userName);
}

