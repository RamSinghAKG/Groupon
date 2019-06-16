import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'components/errorboundary/errorboundary';
import config from 'src/config';
import './search.css';
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
        <input aria-label="enter search input" type="text" ref={searchRef} onKeyUp={() => onSearch()} placeholder="Search.." name="search"></input>
        <span className="search-icon" aria-label="search icon"><i className="fa fa-search"></i></span>
      </div>
    </ErrorBoundary>
  );
};
Search.propTypes = {
  getSearch: PropTypes.func
}
export default Search;

