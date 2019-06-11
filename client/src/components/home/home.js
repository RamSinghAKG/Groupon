import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from './connect/actions';
import './home.css';
import Books from '../books/books';
import {Header} from './../header/header';
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
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    // console.log('componentDidUpdate...');
    if (snapshot !== null) {
      console.log('componentDidUpdate...');
      const list = this.scrollRef.current;
      list.scrollTop = list.scrollHeight - snapshot - 50;
    }
  }
  render() {
    return (<React.Fragment>
          <Header></Header>
          <Books books={this.props.books} ref={this.scrollRef} offset = {this.props.offset} fetchBooks={this.props.fetchBooks}></Books>
    </React.Fragment>);
  }
}
Home.propTypes = {
  books: PropTypes.array,
  offset: PropTypes.number,
  fetchBooks: PropTypes.func
};

function mapStateToProps(state) {
  return {
    books: state.libraryReducer.books,
    offset: state.libraryReducer.offset
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBooks: actions.fetchBooks
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

