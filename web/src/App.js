import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import ParticipantApp from './ParticipantApp';
import OrganizerApp from './OrganizerApp';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMappings: [],
      loginAsOrganizer: false
    };
  }

  async componentWillMount() {
    const gameMappings = (await axios.get("/games")).data;
    this.setState({ gameMappings });
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-header">
          <h3>Welcome to PA Game Night!</h3>
        </div>
        {this.state.loginAsOrganizer
          ? <OrganizerApp gameMappings={this.state.gameMappings}/>
          : <ParticipantApp gameMappings={this.state.gameMappings}/>
        }
        <Button color="primary" onClick={() => this.setState({ loginAsOrganizer: !this.state.loginAsOrganizer })}>
          {this.state.loginAsOrganizer ? 'LOGIN AS PARTICIPANT' : 'LOGIN AS ORGANIZER'}
        </Button>
      </div>
    )
  }
}
