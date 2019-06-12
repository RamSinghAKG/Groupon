import * as actions from './actions';
const initialState = {
    book: { _id: '', name: '', price: '', author: '', description: '', count: '' },
    bookInfoResponded: false,
    error: { status: '', statusText: '' }
};
const reducer = (state = initialState, action) => {
    let resetError = { status: '', statusText: '' };
    let resetBook = { _id: '', name: '', price: '', author: '', description: '', count: '' };
    switch (action.type) {
        case actions.SET_NAME:
            return { ...state, book: { ...state.book, name: action.payload } };
        case actions.SET_PRICE:
            return { ...state, book: { ...state.book, price: action.payload } };
        case actions.SET_AUTHOR:
            return { ...state, book: { ...state.book, author: action.payload } };
        case actions.SET_COUNT:
            return { ...state, book: { ...state.book, count: action.payload } };
        case actions.SET_DESCRIPTION:
            return { ...state, book: { ...state.book, description: action.payload } };
        case actions.UPDATE_BOOK_SUCCESS:
            return { ...state, error: resetError };
        case actions.UPDATE_BOOK_FAILED:
            return { ...state, error: action.payload };
        case actions.CREATE_BOOK_SUCCESS:
            return { ...state, book: resetBook, error: resetError };
        case actions.CREATE_BOOK_FAILED:
            return { ...state, error: action.payload };
        case actions.GET_BOOK_INFO_SUCCESS:
            return { ...state, book: action.payload, bookInfoResponded: true, error: resetError };
        case actions.GET_BOOK_INFO_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default reducer;