import React, { Component } from 'react';
import './App.css';
import Tic_Tac_Toe from './tic_tac_toe'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{ textAlign: "center" }}>
          <h2>Tic Tac Toe</h2>
          <Tic_Tac_Toe></Tic_Tac_Toe>
        </header>
      </div>
    );
  }
}

export default App;