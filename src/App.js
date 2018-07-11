import React, { Component } from 'react';
import Clock from './Clock';
import { Button, Table, Search } from './Components';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.removeItem = this.removeItem.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  removeItem(id) {
    const updatedList = this.state.result.hits.filter(item => item.objectID !== id);
    this.setState({ result: { ...this.state.result, hits: updatedList } });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  render() {
    const { searchTerm, result } = this.state;
    const currentPage = (result && result.page) || 0;
    return (
      <div>
        <br />
        <h1 className="ui header center aligned">Road to React</h1>
        <br />
        <Clock />
        <div className="ui segment">
          <h2 className="ui header">React Ecosystem</h2>
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Search the Titles</Search> 
          { result && 
            <Table list={result.hits} onDismiss={this.removeItem} />
          }
          <Button color="green" onClick={() => this.fetchSearchTopStories(searchTerm, currentPage + 1)}>Next 20 Stories</Button>
        </div>
      </div>
    );
  }
}

export default App;
