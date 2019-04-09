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


function onGameSelected(gameKey, isSelected) {
  if (isSelected) this.state.userSelections.push(gameKey);
  else _.pull(this.state.userSelections, gameKey);
  this.setState({ userSelections: this.state.userSelections });
}

function restartApp() {
  this.setState({
    activeStep: 0,
    errorMessage: null,
    userName: null,
    userSelections: []
  })
}

function submitInfo() {
  this.props.updateGameMappings(this.state.userSelections, this.state.userName);
}

