import React from 'react';
import ResultsPage from './pages/ResultsPage';

export default class OrganizerApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="organizer-content">
        <ResultsPage gameMappings={this.props.gameMappings}/>
      </div>
    )
  }
}