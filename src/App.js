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

const ReactItem = ({ item }) => {
  const { title, author, num_comments, points } = item;
  return <li>{title} - {author} - {num_comments} - {points}</li>;
};

const ReactList = ({ list }) => {
  const listItems = list.map(item => {
    return <ReactItem key={item.objectID} item={item}/>;
  });
  return <ul>{listItems}</ul>;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list
    };

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div>
        <ReactList list={this.state.list} />
        <button onClick={this.removeItem.bind(this, 1)}>Delete 1</button>
      </div>
    );
  }
}

export default App;
