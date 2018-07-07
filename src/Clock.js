import React, { Component } from 'react';

export default class Clock extends Component {
  constructor(props) {
    super(props);
      this.state = {
        date: new Date().toLocaleTimeString()
      };
  }

  componentDidMount() {
    this.timerID = setInterval(() => { this.tick(); }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date().toLocaleTimeString() });
  }

  render() {
    return (
      <div className="ui segment">
        <h2 className="ui header">Current Time</h2>
        <span>{this.state.date}</span>
      </div>
    )
  }
}