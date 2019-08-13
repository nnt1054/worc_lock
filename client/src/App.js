import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

const API = 'http://localhost:8000/api';
const DEFAULT_QUERY = '/timesheet/create?hey=1&jeff=2';
const TIMER_QUERY = '/timer'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        jeff: 1,
        counter: null,
        hey: 'jeff',
    };
  }

  componentDidMount() {

    // fetch(API + DEFAULT_QUERY)
    //   .then(response => response.json())
    //   .then(data => this.setState({ 
    //       jeff: data.jeff
    //   }))


    this.interval = setInterval(() => fetch(API + TIMER_QUERY)
      .then(response => response.json())
      .then(data => this.setState({
          counter: data.state
      })), 1000);

  }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

  render() {

    const data = this.state;

    return (
        <div>
            <h1> hello world </h1>
            <p> {data.jeff} </p>
            <p> {data.counter} </p>
        </div>
    );
  }
}

export default App;
