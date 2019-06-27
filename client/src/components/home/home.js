import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from './connect/actions';
import Spinner from 'components/UI/spinner/spinner';
import Header from 'components/header/header';
import ErrorBoundary from 'components/errorboundary/errorboundary';
import './home.css';
const Home = (props) => {
  const Books = React.lazy(() => import('components/books/books'));
  let scrollRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [numOfBooks, setNumOfBooks] = useState(0);
  const getBooks = props.fetchBooks;
  const {isSearch, error, setFilteredBooks} = props;
  const bookCollection = isSearch ? props.filteredBooks : props.books;
  const currentNumberOfBooks = props.books.length;

  useEffect(() => {
    getBooks()
  }, [getBooks]);

  useEffect(() => {
    const setScrollPostion = () => {
      let list = scrollRef.current;
      if (list && currentNumberOfBooks > numOfBooks) {
        const lastItemOffset = 100;
        list.scrollTop = scrollPosition - lastItemOffset;
      }
    }
    setScrollPostion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfBooks]);

  const fetchBooks = (offset) => {
    setScrollPosition(scrollRef.current.scrollHeight);
    setNumOfBooks(props.books.length);
    !isSearch && props.fetchBooks(offset);
  }

  return (
    <ErrorBoundary>
      {props.isLoading ? <Spinner /> : null}
      <header>
      {useMemo(
        () => {
          const filterSearchRecord = (query) => {
            const allBooks = props.books;
            let filterRecords = [];
            var pattern = new RegExp(query, "gi");
            filterRecords = allBooks.filter(item => {
              return pattern.test(item.author) || pattern.test(item.name) || pattern.test(item.description);
            });
            query.length > 0 ? setFilteredBooks(filterRecords) : getBooks();
          }
          return (
              <Header getSearch={filterSearchRecord} error={error}></Header>
          )
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [error, isSearch] )}
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Books books={bookCollection} ref={scrollRef} offset={props.offset} fetchBooks={fetchBooks}></Books>
        </Suspense>
      </main>
    </ErrorBoundary>
  );

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
    error: state.commonReducer.error.statusText,
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

