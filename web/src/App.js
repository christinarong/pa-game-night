import React from 'react';
import axios from 'axios';
import { Button, Step, Stepper, StepLabel } from '@material-ui/core';
import AppService from './AppService';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMappings: [],
      activeStep: 0,
      errorMessage: null,
      userName: null,
      userSelections: []
    };
    this.steps = ['Login', 'Browse Games', 'Rank Interest', 'Submit'];

    for (let func in AppService) this[func] = AppService[func].bind(this);
  }

  async componentWillMount() {
    const gameMappings = (await axios.get("/games")).data;
    this.setState({ gameMappings });
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-header">
          <h3>{`Welcome to PA Game Night!`}</h3>
        </div>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {this.steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {this.getStepperContent()}
        <div className="stepperControls">
          <p style={{color: 'red'}}>{this.state.errorMessage ? `Error: ${this.state.errorMessage}` : null}</p>
          <Button
            className="stepperButton"
            variant="contained"
            color="primary"
            disabled={this.state.activeStep === 0}
            onClick={this.moveBackward}
          >
            PREV
          </Button>
          <Button
            className="stepperButton"
            variant="contained"
            color="primary"
            disabled={this.state.activeStep === this.steps.length - 1}
            onClick={this.moveForward}
          >
            NEXT
          </Button>
        </div>
      </div>
    )

  }
}
