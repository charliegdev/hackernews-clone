import React, { Component } from 'react';
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

const ReactItem = ({ item, onClickFunc }) => {
  const { title, author, num_comments, points, objectID } = item;
  return (
    <li className="item">{title} - {author} - {num_comments} - {points} &nbsp;
      <button className="ui yellow button" onClick={onClickFunc.bind(undefined, objectID)}>Remove Item</button> 
    </li>
  );
};

const ReactList = ({ list, onClickFunc }) => {
  const listItems = list.map(item => {
    return <ReactItem key={item.objectID} item={item} onClickFunc={onClickFunc} />;
  });
  return <ul className="ui list">{listItems}</ul>;
};

class Clock extends Component {
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
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ""
    };

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div>
        <br />
        <h1 className="ui header center aligned">Road to React</h1>
        <br />
        <Clock />
        <div className="ui segment">
          <h2 className="ui header">Documentation List</h2>
          <div className="ui icon input">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={this.onSearchChange} />
            <i className="search icon"></i>
          </div>
          <ReactList list={list.filter(isSearched(searchTerm))} onClickFunc={this.removeItem} />
        </div>
      </div>
    );
  }
}

export default App;
