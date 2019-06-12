import React from 'react';
import './search.css';
import { ErrorBoundary } from '../../errorboundary/errorboundary';
const Search = () => {
  const searchRef = React.createRef();
  const onSearch = () => {
      const query = searchRef.current.value;
      getSearchInfo(query);
  };
  const getSearchInfo = (query) => {
    console.log('getSearchInfo --> ', query);
  };
  return (
    <ErrorBoundary>
      <div className="search-container">
        <input type="text" ref={searchRef} onKeyUp={(event) => getSearchInfo(event.target.value)} placeholder="Search.." name="search"></input>
        <button type="submit" onClick={() => onSearch()}><i className="fa fa-search"></i></button>
      </div>
    </ErrorBoundary>
  );
};

export default Search;

