import config from '../../../config';
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILED = "GET_BOOKS_FAILED";
export const GET_SEARCH_SUCCESS = "GET_SEARCH_SUCCESS";
export const GET_SEARCH_FAILED = "GET_SEARCH_FAILED";
export  const getSearch =  (query) => async (dispatch) => {
    try {
        let url = config.apiserver + `/library/search/${query}`;
        let response = await fetch(url);
        if(response.status === 200) {
            let books = await response.json();
            return dispatch({
                type: GET_SEARCH_SUCCESS,
                payload: books
            });
        } else {
            return dispatch({
                type: GET_SEARCH_FAILED,
                payload: {status: response.status, statusText: response.statusText}
            });
        }
        
    }catch(error){
        return dispatch({
            type: GET_SEARCH_FAILED,
            payload: {status: 'FAILED', statusText: error.message}
        });
    }
};
export  const fetchBooks =  (offset = 0) => async (dispatch) => {
    try {
        let url = config.apiserver + `/library/books/${offset}`;
        let response = await fetch(url);
        if(response.status === 200) {
            let books = await response.json();
            books.length === 0 && --offset;
            return dispatch({
                type: GET_BOOKS_SUCCESS,
                payload: {books, offset}
            });
        } else {
            return dispatch({
                type: GET_BOOKS_FAILED,
                payload: {status: response.status, statusText: response.statusText}
            });
        }
        
    }catch(error){
        return dispatch({
            type: GET_BOOKS_FAILED,
            payload: {status: 'FAILED', statusText: error.message}
        });
    }
};

