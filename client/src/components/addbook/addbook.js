import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Header } from './../header/header';
import './addbook.css';
import * as actions from './connect/actions';
const AddBook = (props) => {
    let isEdit = false;
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
    const fetchBookInfo = () => {
        console.log('fetchBookInfo...');
        const { id } = props.match.params;
        props.fetchBookInfo(id);
    }
    
    isEdit = props.location.isEdit;
    const createBtn = isEdit ? <button className="action-btn" onClick={() => update()}>Update</button> : <button className="action-btn" onClick={() => create()}>Create</button>;
    const isNameDisable = isEdit ? true : '';

    isEdit && !props.bookInfoResponded && setTimeout(fetchBookInfo, 0);
    return (
        <React.Fragment>
            <Header isNormalHeader={true}></Header>
            <div className="addBook-container">
                <div key='name' className="formfield" >
                    <label htmlFor="name">Name</label>
                    <input disabled={isNameDisable} type="text" value={props.book.name} placeholder="Enter name.." name="name" onChange={(event) => props.setName(event.target.value)}></input>
                </div>
                <div key='price' className="formfield">
                    <label htmlFor="price">Price</label>
                    <input type="number" value={props.book.price} placeholder="Enter price.." name="price" onChange={(event) => props.setPrice(event.target.value)}></input>
                </div>
                <div key='author' className="formfield">
                    <label htmlFor="author">Author</label>
                    <input type="text" value={props.book.author} placeholder="Enter author.." name="author" onChange={(event) => props.setAuthor(event.target.value)}></input>
                </div>
                <div key='desc' className="formfield">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={props.book.description} placeholder="Enter book description.." onChange={(event) => props.setDescription(event.target.value)}></textarea>
                </div>
                <div key='count' className="formfield">
                    <label htmlFor="count">Count</label>
                    <input type="number" value={props.book.count} placeholder="Enter count.." name="count" onChange={(event) => props.setCount(event.target.value)}></input>
                </div>
                <button className="action-btn" onClick={() => goBack()}>Cancel</button>
                {createBtn}
            </div>
        </React.Fragment>
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
    bookInfoRequested: PropTypes.bool
};
function mapStateToProps(state) {
    return {
        book: state.bookReducer.book,
        bookInfoResponded: state.bookReducer.bookInfoResponded
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
