import React from 'react';
import axios from 'axios';
import { Button, Step, Stepper, StepLabel } from '@material-ui/core';
import ParticipantAppService from './ParticipantAppService';

export default class ParticipantApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMappings: this.props.gameMappings,
      activeStep: 0,
      errorMessage: null,
      userName: null,
      userSelections: []
    };
    this.steps = ['Login', 'Browse Games', 'Submit'];

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
        <div className="stepper-controls">
          <p style={{color: 'red'}}>{this.state.errorMessage ? `Error: ${this.state.errorMessage}` : null}</p>
          <Button
            className="stepper-button"
            variant="contained"
            color="primary"
            disabled={this.state.activeStep === 0 || this.state.activeStep === this.steps.length - 1}
            onClick={this.moveBackward}
          >
            PREV
          </Button>
          <Button
            className="stepper-button"
            variant="contained"
            color="primary"
            disabled={this.state.activeStep === this.steps.length - 1}
            onClick={this.moveForward}
          >
            {this.state.activeStep === this.steps.length - 2 ? 'SUBMIT' : 'NEXT'}
          </Button>
        </div>
      </div>
    )
  }
}
