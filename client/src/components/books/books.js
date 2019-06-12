import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './books.css';
import { ErrorBoundary } from './../errorboundary/errorboundary';

const Books = React.forwardRef((props, ref) => {
    let timerId = 0;
    const printTime = () => {
        let dt = new Date();
        const time = `${dt.getHours()} : ${dt.getMinutes()} : ${dt.getSeconds()} : ${dt.getMilliseconds()}}`;
        console.log('time -> ', time);
    };
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
        timerId = setTimeout(getBooks, 500);
    };

    const getBooks = () => {
        props.fetchBooks(props.offset+1);
    }
    
    const bookCollection =  props.books.map((item, index) => {
        const editLink=`/edit/${item._id}`
        return (
            <div key={index} className="book-container">
                <div className="book-info">
                    <div > {item.name} </div>
                    <div > {item.author} </div>
                    <div > Rs. {item.price} </div>
                </div>
                <Link to={{pathname: editLink, isEdit: true}} className="book-edit">Edit</Link>
            </div>
        );
    });
    return (
        <ErrorBoundary>
            <div className="scrollableSection" ref={ref} onScroll={(event) => scrollHandler(event)}> {bookCollection}</div>
        </ErrorBoundary>);
    
});

Books.propTypes = {
    offset: PropTypes.number,
    books: PropTypes.array,
    fetchBooks: PropTypes.func
};

export default Books;