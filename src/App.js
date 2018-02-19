import React, { Component } from 'react';
import './App.css';

import Body from './components/TableContacts';
import Header from './components/Header';

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}
