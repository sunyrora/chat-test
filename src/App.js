import React, { Component } from 'react';
import Chat from './containers/Chat';
import styles from './App.css';

class App extends Component {
  render() {
    console.log('styles.App: ', styles.App);
    return (
      <div className={styles.App}>
        <Chat />
      </div>
    );
  }
}

export default App;
