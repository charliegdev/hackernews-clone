import React, { Component } from 'react';
import Clock from './Clock';

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

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Search = ({ value, onChange }) =>
  <div className="ui icon input">
    <input type="text" placeholder="Search..." value={value} onChange={onChange} />
    <i className="search icon"></i>
  </div>

const Row = ({ item, dismissFunc }) => {
  const { objectID, url, title, author, num_comments, points } = item;
  return (
    <tr key={objectID}>
      <td><a href={url}>{title}</a></td>
      <td>{author}</td>
      <td>{num_comments}</td>
      <td>{points}</td>
      <td><button className="ui button orange" onClick={dismissFunc.bind(undefined, objectID)}>Dismiss</button></td>
    </tr>
  );
}

const Table = ({ list, pattern, onDismiss }) =>
  <table className="ui celled padded table">
    <thead>
      <tr>
        <th className="single line">Title</th>
        <th>Author</th>
        <th>Comment</th>
        <th>Points</th>
        <th>Action</th>
      </tr>
    </thead> 
    <tbody>
      {list.filter(isSearched(pattern)).map(item => 
        <Row key={item.objectID} item={item} dismissFunc={() => onDismiss(item.objectID)} />
      )}
    </tbody>
  </table>

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
          <h2 className="ui header">React Ecosystem</h2>
          <Search value={searchTerm} onChange={this.onSearchChange} />
          <Table list={list} pattern={searchTerm} onDismiss={this.removeItem} />
        </div>
      </div>
    );
  }
}

export default App;
