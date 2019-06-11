import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './books.css';

const Books = React.forwardRef((props, ref) => {
    let timerId = 0;
    const scrollHandler = (event) => {
        console.log('onscroll....')
        const element = event.target;
        const percentage = (element.scrollTop /  (element.scrollHeight - element.clientHeight))*100;
        if(percentage === 100) {
            // console.log('fetch now...'+Date.now());
            timerId = setTimeout(fetchBooks, 1000);
        }
    };
    const fetchBooks = () => {
        // console.log('get data...');
        clearTimeout(timerId);
        props.fetchBooks(props.offset+1);
    };
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
    return (<div className="scrollableSection" ref={ref} onScroll={(event) => scrollHandler(event)}> {bookCollection}</div>);
});

Books.propTypes = {
    offset: PropTypes.number,
    books: PropTypes.array,
    fetchBooks: PropTypes.func
};

export default Books;