import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './books.css';
import { ErrorBoundary } from './../errorboundary/errorboundary';
import {printTime} from '../../util';
import config from '../../config';
const Books = React.forwardRef((props, ref) => {
    let timerId = 0;
    const scrollHandler = (event) => {
        const element = event.target;
        const percentage = (element.scrollTop /  (element.scrollHeight - element.clientHeight))*100;
        if(percentage === 100) {
            clearTimeout(timerId);
            fetchBooks();
        }
    };
    const fetchBooks = () => {
        printTime();
        timerId = setTimeout(getBooks, config.delay);
    };

    const getBooks = () => {
        props.fetchBooks(props.offset+1);
    }
    
    const bookCollection =  props.books.map((item, index) => {
        const editLink=`/edit/${item._id}`
        return (
            <div key={index} className="book-container">
                <div aria-label="book information" className="book-info">
                    <div aria-label="book name"> {item.name} </div>
                    <div aria-label="book author name"> {item.author} </div>
                    <div aria-label="book price"> Rs. {item.price} </div>
                </div>
                <Link aria-label="edit book detail" to={{pathname: editLink, isEdit: true}} className="book-edit">Edit</Link>
            </div>
        );
    });
    const norecord = <div aria-label="no records found" className="norecord">No matching books found...</div>;
    
    return (
        <ErrorBoundary>
            <div aria-label="book container" className="scrollableSection" ref={ref} onScroll={(event) => scrollHandler(event)} > {props.books.length === 0 ? norecord : bookCollection} </div>
        </ErrorBoundary>);
});

Books.propTypes = {
    offset: PropTypes.number,
    books: PropTypes.array,
    fetchBooks: PropTypes.func
};

export default Books;