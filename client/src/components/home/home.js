import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from './connect/actions';
import './home.css';
import Books from '../books/books';
import { Header } from './../header/header';
import { ErrorBoundary } from './../errorboundary/errorboundary';
class Home extends React.Component {
  scrollRef = React.createRef();
  componentDidMount() {
    this.props.fetchBooks();
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.books.length < this.props.books.length) {
      const list = this.scrollRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.scrollRef.current;
      list.scrollTop = list.scrollHeight - snapshot - 50;
    }
  }
  fetchBooks = (offset) => {
    !this.props.isSearch && this.props.fetchBooks(offset);
  }
  filterSearchRecord = (query) => {
    const allBooks = this.props.books;
    let filterRecords = [];
    var pattern = new RegExp(query, "gi");
    filterRecords = allBooks.filter(item => {
      let isSearchable = pattern.test(item.author) || pattern.test(item.name) || pattern.test(item.description);
      if (isSearchable) { return item; }
    });
    query.length>0 ? this.props.setFilteredBooks(filterRecords) : this.props.fetchBooks();
  }
  render() {
    const bookCollection = this.props.isSearch ? this.props.filteredBooks : this.props.books;
    return (
      <ErrorBoundary>
        <Header getSearch={this.filterSearchRecord} error={this.props.error}></Header>
        <Books books={bookCollection} ref={this.scrollRef} offset={this.props.offset} fetchBooks={this.fetchBooks}></Books>
      </ErrorBoundary>
    );
  }
}
Home.propTypes = {
  books: PropTypes.array,
  offset: PropTypes.number,
  fetchBooks: PropTypes.func,
  getSearch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    books: state.libraryReducer.books,
    filteredBooks: state.libraryReducer.filteredBooks,
    isSearch: state.libraryReducer.isSearch,
    offset: state.libraryReducer.offset,
    error: state.libraryReducer.error.statusText
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBooks: actions.fetchBooks,
    getSearch: actions.getSearch,
    setFilteredBooks: actions.setFilteredBooks
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

