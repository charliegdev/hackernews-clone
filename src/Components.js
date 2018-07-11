import React from 'react';

const Button = ({ onClick, color = "", children, type = "button" }) => 
  <button onClick={onClick} className={"ui button " + color} type={type}>{children}</button>

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
      {list.map(item => 
        <Row key={item.objectID} item={item} dismissFunc={() => onDismiss(item.objectID)} />
      )}
    </tbody>
  </table>

const Search = ({ value, onChange, onSubmit, children }) =>
  <form className="ui icon labeled input" onSubmit={onSubmit}>
    <div className="ui label">{children}</div>
    <input type="text" placeholder="Title..." value={value} onChange={onChange} />
    &nbsp;
    <Button type="submit" onClick={onSubmit} color="blue">Search</Button>
  </form>

export { Button, Table, Search };