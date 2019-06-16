import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from './connect/actions';
import './home.css';
import Books from '../books/books';
import { Header } from './../header/header';
import Spinner from '../UI/spinner/spinner';
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
      list.scrollTop = list.scrollHeight - snapshot - 20;
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
      const isSearchable = pattern.test(item.author) || pattern.test(item.name) || pattern.test(item.description);
      return isSearchable;
    });
    query.length>0 ? this.props.setFilteredBooks(filterRecords) : this.props.fetchBooks();
  }
  render() {
    const bookCollection = this.props.isSearch ? this.props.filteredBooks : this.props.books;
    return (
      <ErrorBoundary>
        {this.props.isLoading ? <Spinner></Spinner> : null} 
        <header>
            <Header getSearch={this.filterSearchRecord} error={this.props.error}></Header>
        </header>
        <main>
          <Books books={bookCollection} ref={this.scrollRef} offset={this.props.offset} fetchBooks={this.fetchBooks}></Books>
        </main>
      </ErrorBoundary>
    );
  }
}
Home.propTypes = {
  books: PropTypes.array,
  offset: PropTypes.number,
  fetchBooks: PropTypes.func,
  getSearch: PropTypes.func,
  isLoading: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    books: state.libraryReducer.books,
    filteredBooks: state.libraryReducer.filteredBooks,
    isSearch: state.libraryReducer.isSearch,
    offset: state.libraryReducer.offset,
    error: state.libraryReducer.error.statusText,
    isLoading: state.commonReducer.isLoading
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

