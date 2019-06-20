import config from '../../../config';
import * as commonActions from 'common/actions'
export const SET_NAME = "SET_NAME";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_COUNT = "SET_COUNT";
export const SET_PRICE = "SET_PRICE";
export const SET_AUTHOR = "SET_AUTHOR";
export const CREATE_BOOK_SUCCESS = "CREATE_BOOK_SUCCESS";
export const CREATE_BOOK_FAILED = "CREATE_BOOK_FAILED";
export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
export const UPDATE_BOOK_FAILED = "UPDATE_BOOK_FAILED";
export const GET_BOOK_INFO_REQUESTED = "GET_BOOK_INFO_REQUESTED";
export const GET_BOOK_INFO_SUCCESS = "GET_BOOK_INFO_SUCCESS";
export const GET_BOOK_INFO_FAILED = "GET_BOOK_INFO_FAILED";

export const setName = (name) => (dispatch) => {
    return dispatch({
        type: SET_NAME,
        payload: name
    });
}
export const setPrice = (price) => (dispatch) => {
    return dispatch({
        type: SET_PRICE,
        payload: price
    });
}
export const setAuthor = (author) => (dispatch) => {
    return dispatch({
        type: SET_AUTHOR,
        payload: author
    });
}
export const setCount = (count) => (dispatch) => {
    return dispatch({
        type: SET_COUNT,
        payload: count
    });
}
export const setDescription = (description) => (dispatch) => {
    return dispatch({
        type: SET_DESCRIPTION,
        payload: description
    });
}
export  const createBook =  (bookInfo={}) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        let url = config.apiserver + '/library/create';
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookInfo)
        }
        let response = await fetch(url, options);
        if(response.status === 200) {
            let booksInfo = await response.json();
            commonActions.loadingCompleted(dispatch);
            return dispatch({
                type: CREATE_BOOK_SUCCESS,
                payload: booksInfo
            });
        } else {
            return commonActions.loadingFailed({status: response.status, statusText: response.statusText})(dispatch);
        }
        
    }catch(error){
        return commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};

export  const updateBook =  (bookInfo={}, history) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        let url = config.apiserver + '/library/book/update';
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({book: bookInfo})
        }
        let response = await fetch(url, options);
        if(response.status === 200) {
            let booksInfo = await response.json();
            commonActions.loadingCompleted(dispatch);
            history.goBack();
            return dispatch({
                type: UPDATE_BOOK_SUCCESS,
                payload: booksInfo
            });

        } else {
            return commonActions.loadingFailed({status: response.status, statusText: response.statusText})(dispatch);
        }
    }catch(error){
        return commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};
export  const fetchBookInfo =  (id) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        let url = config.apiserver + '/library/book/'+id;
        let response = await fetch(url);
        if(response.status === 200) {
            let booksInfo = await response.json();
            commonActions.loadingCompleted(dispatch);
            return dispatch({
                type: GET_BOOK_INFO_SUCCESS,
                payload: booksInfo[0]
            });

        } else {
            return commonActions.loadingFailed({status: response.status, statusText: response.statusText})(dispatch);
        }
        
    }catch(error){
         commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};


