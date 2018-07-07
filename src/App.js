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

/*
const ReactItem = ({ item, onClickFunc }) => {
  const { title, author, num_comments, points, objectID } = item;
  return (
    <li className="item">{title} - {author} - {num_comments} - {points} &nbsp;
      <button className="ui yellow button" onClick={onClickFunc.bind(undefined, objectID)}>Remove Item</button> 
    </li>
  );
};
*/

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Search = ({ value, onChange }) =>
  <div className="ui icon input">
    <input type="text" placeholder="Search..." value={value} onChange={onChange} />
    <i className="search icon"></i>
  </div>

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
        <tr key={item.objectID}>
          <td><a href={item.url}>{item.title}</a></td>
          <td>{item.author}</td>
          <td>{item.num_comments}</td>
          <td>{item.points}</td>
          <td><button className="ui button orange" onClick={() => onDismiss(item.objectID)}>Dismiss</button></td>
        </tr>
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
          <h2 className="ui header">Documentation List</h2>
          <Search value={searchTerm} onChange={this.onSearchChange} />
          <Table list={list} pattern={searchTerm} onDismiss={this.removeItem} />
        </div>
      </div>
    );
  }
}

export default App;
