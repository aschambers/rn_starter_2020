import React, { Component } from 'react';
import { LogBox } from 'react-native';
import Main from './src/Main';

LogBox.ignoreAllLogs = true;

class App extends Component {
  render() {
    return <Main />;
  }
}

export default App;