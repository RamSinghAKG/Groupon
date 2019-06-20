import React, { Suspense, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from './connect/actions';
import ErrorBoundary from 'components/errorboundary/errorboundary';
import './addbook.css';
const AddBook = (props) => {
    const Header = React.lazy(() => import('components/header/header'));
    const Spinner = React.lazy(() => import('components/UI/spinner/spinner'));
    const isEdit = props.location.isEdit;
    const { id } = props.match.params;
    const getBookInfo = props.fetchBookInfo;
    useEffect(() => {
        id && isEdit && getBookInfo(id);
    }, [getBookInfo, id, isEdit]);

    const create = () => {
        var isDataValid = props.book.name.length > 0 && props.book.price > 0 && props.book.count > 0;
        isDataValid && props.createBook(props.book);
    };
    const goBack = () => {
        const { history } = props;
        history.goBack();
    }
    const update = () => {
        var isDataValid = props.book.name.length > 0 && props.book.price > 0 && props.book.count > 0;
        isDataValid && props.updateBook(props.book, props.history);
    }

    const createBtn = isEdit ? <button aria-label="update book" className="action-btn" onClick={() => update()}>Update</button> : <button aria-label="create book" className="action-btn" onClick={() => create()}>Create</button>;
    const isNameDisable = isEdit ? true : '';

    console.log('render addbook ....');
    return (
        <ErrorBoundary>
            {props.isLoading ? <Suspense fallback={<div>Loading...</div>}>
                <Spinner />
            </Suspense> : null}
            {useMemo(
                () => (
                    <header>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Header isNormalHeader={true} error={props.error}></Header>
                        </Suspense>
                    </header>
                ),
                [props.error]
            )}

            <main className="addBook-container">
                <div key='name' className="formfield" >
                    <label htmlFor="name">Name</label>
                    <input aria-label="book name" disabled={isNameDisable} type="text" value={props.book.name} placeholder="Enter name.." name="name" onChange={(event) => props.setName(event.target.value)}></input>
                </div>
                <div key='price' className="formfield">
                    <label htmlFor="price">Price</label>
                    <input aria-label="enter book price" type="number" value={props.book.price} placeholder="Enter price.." name="price" onChange={(event) => props.setPrice(event.target.value)}></input>
                </div>
                <div key='author' className="formfield">
                    <label htmlFor="author">Author</label>
                    <input aria-label="enter book author" type="text" value={props.book.author} placeholder="Enter author.." name="author" onChange={(event) => props.setAuthor(event.target.value)}></input>
                </div>
                <div key='desc' className="formfield">
                    <label htmlFor="description">Description</label>
                    <textarea aria-label="enter book description" name="description" value={props.book.description} placeholder="Enter book description.." onChange={(event) => props.setDescription(event.target.value)}></textarea>
                </div>
                <div key='count' className="formfield">
                    <label htmlFor="count">Count</label>
                    <input aria-label="enter book count" type="number" value={props.book.count} placeholder="Enter count.." name="count" onChange={(event) => props.setCount(event.target.value)}></input>
                </div>
                <button aria-label="go back" className="action-btn" onClick={() => goBack()}>Cancel</button>
                {createBtn}
            </main>
        </ErrorBoundary>
    );
};
AddBook.propTypes = {
    setName: PropTypes.func,
    setPrice: PropTypes.func,
    setAuthor: PropTypes.func,
    setCount: PropTypes.func,
    setDescription: PropTypes.func,
    createBook: PropTypes.func,
    updateBook: PropTypes.func,
    fetchBookInfo: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object,
    bookInfoResponded: PropTypes.bool,
    isLoading: PropTypes.bool
};
function mapStateToProps(state) {
    return {
        book: state.bookReducer.book,
        bookInfoResponded: state.bookReducer.bookInfoResponded,
        error: state.bookReducer.error.statusText,
        isLoading: state.commonReducer.isLoading
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setName: actions.setName,
        setPrice: actions.setPrice,
        setAuthor: actions.setAuthor,
        setCount: actions.setCount,
        setDescription: actions.setDescription,
        createBook: actions.createBook,
        updateBook: actions.updateBook,
        fetchBookInfo: actions.fetchBookInfo
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddBook));
