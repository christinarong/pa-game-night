import React, { Component } from "react";

import SelectionPage from "./SelectionPage";
import LandingPage from "./LandingPage";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <SelectionPage user={this.state.user} />
        </div>
      );
    } else {
      return <LandingPage onSubmit={user => this.setState({ user })} />;
    }
  }
}
