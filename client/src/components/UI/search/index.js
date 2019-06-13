import React from 'react';
import PropTypes from 'prop-types';
import './search.css';
import { ErrorBoundary } from '../../errorboundary/errorboundary';
import config from '../../../config';
const Search = (props) => {
  const searchRef = React.createRef();
  let timerId = 0;
  const onSearch = () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => getSearchInfo(), config.delay);
  };
  const getSearchInfo = () => {
    const query = searchRef.current.value;
    console.log('getSearchInfo --> ', query);
    props.getSearch(query.trim());
  };
  return (
    <ErrorBoundary>
      <div className="search-container">
        <input type="text" ref={searchRef} onKeyUp={() => onSearch()} placeholder="Search.." name="search"></input>
        <button><i className="fa fa-search"></i></button>
      </div>
    </ErrorBoundary>
  );
};
Search.propTypes = {
  getSearch: PropTypes.func
}
export default Search;

