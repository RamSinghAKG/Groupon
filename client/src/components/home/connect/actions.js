import * as commonActions from 'common/actions';
import * as service from 'common/service';
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILED = "GET_BOOKS_FAILED";
export const GET_SEARCH_SUCCESS = "GET_SEARCH_SUCCESS";
export const GET_SEARCH_FAILED = "GET_SEARCH_FAILED";
export const SET_FILTER_BOOKS = "SET_FILTER_BOOKS";
export const setFilteredBooks = (books) => (dispatch) => {
    return dispatch({
        type: SET_FILTER_BOOKS,
        payload: [...books]
    });
};
export const getSearch = (query) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        const url = service.url.search + query;
        const books = await service.getData(url);
        commonActions.loadingCompleted(dispatch);
        return dispatch({
            type: GET_SEARCH_SUCCESS,
            payload: books
        });
    } catch (error) {
        return commonActions.loadingFailed({ status: 'FAILED', statusText: error.message })(dispatch);
    }
};
export const fetchBooks = (offset = 0) => async (dispatch) => {
    try {
        commonActions.loadingInprogress(dispatch);
        let url = service.url.getBooks + offset;
        const books = await service.getData(url);
        books.length === 0 && --offset;
        commonActions.loadingCompleted(dispatch);
        return dispatch({
            type: GET_BOOKS_SUCCESS,
            payload: { books, offset }
        });
    } catch (error) {
        return commonActions.loadingFailed({ status: 'FAILED', statusText: error.message })(dispatch);
    }
};

