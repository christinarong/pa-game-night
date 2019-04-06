import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Column, Row } from "simple-flexbox";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      text: ""
    }
  }

  render() {
    return (
      <Column className={"landingPage"}>
        <div style={{ flex: 1 }} />
        <div className={"header"}>Welcome to PA Game Night</div>
        <Row className={"content"}>
          <div style={{ flex: 1 }} />
          <TextField onChange={(event) => this.onTextFieldChanged(event.target.value)} />
          <Button onClick={() => this.props.onSubmit(this.state.text)}>Submit</Button>
          <div style={{ flex: 1 }} />
        </Row>
        <div style={{ flex: 1 }} />
      </Column>
    );
  }

  onTextFieldChanged(value) {
    this.setState({text: value})
  }
}
