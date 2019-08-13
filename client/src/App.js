import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

const API = 'http://localhost:8000/api';
const DEFAULT_QUERY = '/timesheet/create?hey=1&jeff=2';
const COUNTER_QUERY = '/counter'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        jeff: 1,
        counter: null,
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ 
          jeff: data.jeff
      }))


    this.interval = setInterval(() => fetch(API + COUNTER_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ 
          counter: data.counter
      })), 1000);

  }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

  render() {

    const data = this.state;

    return (
        <div>
            <h1> hello there what </h1>
            <p> oh you can only have one </p>
            <p> HERE"S A CHANGE </p>
            <p> another one </p>
            <p> another one </p>
            <p> {data.jeff} </p>
            <p> {data.counter} </p>
        </div>
    );
  }
}

export default App;
