import * as commonActions from 'common/actions';
import * as service from 'common/service';
export const SET_NAME = "SET_NAME";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_COUNT = "SET_COUNT";
export const SET_PRICE = "SET_PRICE";
export const SET_AUTHOR = "SET_AUTHOR";
export const RESET_BOOK = "RESET_BOOK";
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
export const resetBookInfo = () => (dispatch) => {
    return dispatch({
        type: RESET_BOOK
    });
};

export  const createBook =  (bookInfo={}) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        await service.postData(service.url.createBook, bookInfo);
        commonActions.loadingCompleted(dispatch);
        return dispatch({
                    type: CREATE_BOOK_SUCCESS
                });
    }catch(error){
        return commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};

export  const updateBook =  (bookInfo={}, history) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        await service.updateData(service.url.updateBook, {book: bookInfo});
        commonActions.loadingCompleted(dispatch);
        history.goBack();
        return dispatch({
                    type: UPDATE_BOOK_SUCCESS
                });
    } catch(error){
        return commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};
export  const fetchBookInfo =  (id) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        let url = service.url.fetchBookInfo + id;
        const booksInfo = await service.getData(url);
        commonActions.loadingCompleted(dispatch);
        return dispatch({
            type: GET_BOOK_INFO_SUCCESS,
            payload: booksInfo[0]
        });
    }catch(error){
         commonActions.loadingFailed({status: 'FAILED', statusText: error.message})(dispatch);
    }
};


