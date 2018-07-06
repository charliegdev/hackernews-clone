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
    <li>{title} - {author} - {num_comments} - {points} 
      <button onClick={onClickFunc.bind(undefined, objectID)}>Remove Item</button> 
    </li>
  );
};

const ReactList = ({ list, onClickFunc }) => {
  const listItems = list.map(item => {
    return <ReactItem key={item.objectID} item={item} onClickFunc={onClickFunc} />;
  });
  return <ul>{listItems}</ul>;
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
      <div>
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
    return (
      <div>
<<<<<<< HEAD
        <ReactList list={this.state.list} onClickFunc={this.removeItem} />
        <Clock />
=======
        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>
        <span>{this.state.searchTerm}</span>
        <ReactList list={this.state.list.filter(isSearched(this.state.searchTerm))} onClickFunc={this.removeItem} />
>>>>>>> d8172cfca5b0d597743add0d509641596b4e7fd8
      </div>
    );
  }
}

export default App;
