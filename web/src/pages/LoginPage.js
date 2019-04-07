import React, { Component } from "react";
import { TextField } from "@material-ui/core";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-page-container">
        <div>Please provide your full name!</div>
        <TextField
          className="nameField"
          required
          margin="normal"
          variant="outlined"
          onChange={event => this.props.userNameChanged(event.target.value)}
        />
      </div>
    );
  }
}
