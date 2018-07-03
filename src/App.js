import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const ReactItem = ({ title }) => <li>{title}</li>;

const ReactList = ({ list }) => {
  const listItems = list.map(item => <ReactItem key={item.objectID} title={item.title}/>)
  return <ul>{listItems}</ul>;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ReactList list={this.state.list} />
      </div>
    );
  }
}

export default App;
