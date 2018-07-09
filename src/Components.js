import React from 'react';

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Button = ({ onClick, color = "", children }) => 
  <button onClick={onClick} className={"ui button " + color} type="button">{children}</button>

const Row = ({ item, dismissFunc }) => {
  const { objectID, url, title, author, num_comments, points } = item;
  return (
    <tr key={objectID}>
      <td><a href={url}>{title}</a></td>
      <td>{author}</td>
      <td>{num_comments}</td>
      <td>{points}</td>
      <td><Button color={"orange"} onClick={dismissFunc.bind(undefined, objectID)}>Dismiss</Button></td>
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

const Search = ({ value, onChange, children }) =>
  <div className="ui icon labeled input">
    <div className="ui label">{children}</div>
    <input type="text" placeholder="Title..." value={value} onChange={onChange} />
    <i className="search icon"></i>
  </div>

export { Table, Search };