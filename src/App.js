import React from "react";

import Game from "./Game";
import Welcome from "./Welcome";

class App extends React.Component {
  state = { welcome: true };

  setResults(e) {
    this.setState({ welcome: e });
  }

  render() {
    return (
      <div className="ctn">
        <div className="ui container">
          {this.state.welcome === true ? (
            <Welcome nextPage={e => this.setResults(e)} />
          ) : (
            <Game reset={e => this.setResults(e)} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
