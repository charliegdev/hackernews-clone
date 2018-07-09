import React, { Component } from 'react';
import Clock from './Clock';
import { Table, Search } from './Components';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      searchTerm: DEFAULT_QUERY,
    };

    this.removeItem = this.removeItem.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  removeItem(id) {
    const updatedList = this.state.result.filter(item => item.objectID !== id);
    this.setState({ result: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
    console.log(this.state.searchTerm);
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result.hits))
      .catch(error => error);
  }

  render() {
    const { searchTerm, result } = this.state;
    if (result.length === 0) return null;
    return (
      <div>
        <br />
        <h1 className="ui header center aligned">Road to React</h1>
        <br />
        <Clock />
        <div className="ui segment">
          <h2 className="ui header">React Ecosystem</h2>
          <Search value={searchTerm} onChange={this.onSearchChange}>Search the Titles</Search> 
          <Table list={result} pattern={searchTerm} onDismiss={this.removeItem} />
        </div>
      </div>
    );
  }
}

export default App;
