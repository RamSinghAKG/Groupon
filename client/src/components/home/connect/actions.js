import config from 'src/config';
import * as commonActions from 'common/actions'
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILED = "GET_BOOKS_FAILED";
export const GET_SEARCH_SUCCESS = "GET_SEARCH_SUCCESS";
export const GET_SEARCH_FAILED = "GET_SEARCH_FAILED";
export const SET_FILTER_BOOKS = "SET_FILTER_BOOKS";
export  const setFilteredBooks =  (books) => (dispatch) => {
            return dispatch({
                type: SET_FILTER_BOOKS,
                payload: [...books]
            });
};
export  const getSearch =  (query) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        let url = config.apiserver + `/library/search/${query}`;
        let response = await fetch(url);
        if(response.status === 200) {
            let books = await response.json();
            commonActions.loadingCompleted(dispatch);
            return dispatch({
                type: GET_SEARCH_SUCCESS,
                payload: books
            });
        } else {
            return commonActions.loadingFailed({status: response.status, statusText: response.statusText})(dispatch);
        }
        
    }catch(error){
        return commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};
export  const fetchBooks =  (offset = 0) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        let url = config.apiserver + `/library/books/${offset}`;
        let response = await fetch(url);
        if(response.status === 200) {
            let books = await response.json();
            books.length === 0 && --offset;
            commonActions.loadingCompleted(dispatch);
            return dispatch({
                type: GET_BOOKS_SUCCESS,
                payload: {books, offset}
            });
        } else {
            return commonActions.loadingFailed({status: response.status, statusText: response.statusText})(dispatch);
        }
        
    }catch(error){
        return commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};

