import React from 'react';
import './search.css';
  const Search = () => {
    return (<form className="search-container" action="/search">
            <input type="text" placeholder="Search.." name="search"></input>
            <button type="submit"><i className="fa fa-search"></i></button>
        </form>);
};

export default Search;

