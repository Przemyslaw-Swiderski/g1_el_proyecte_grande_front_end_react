import React, { Component } from 'react';
import RouterReact from './Router/RouterReact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <RouterReact />
      </div>
    );
  }
}

export default App;


