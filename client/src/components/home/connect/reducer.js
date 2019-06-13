import * as actions from './actions';
const initialState = {
    books: [],
    offset: 0,
    isSearch: false,
    filteredBooks: [],
    error: { status: '', statusText: '' }
};
const reducer = (state = initialState, action) => {
    let resetError = { status: '', statusText: '' };
    switch (action.type) {
        case actions.SET_FILTER_BOOKS:
            return { ...state, isSearch: true, filteredBooks: action.payload };
        case actions.GET_BOOKS_SUCCESS:
            let books = state.books;
            if (action.payload.offset === 0) {
                books = [];
            }
            return { ...state, isSearch: false, books: books.concat(action.payload.books), offset: action.payload.offset, error: resetError };
        case actions.GET_BOOKS_FAILED:
            return { ...state, books: [],  error: action.payload };
        case actions.GET_SEARCH_SUCCESS:
            return { ...state, books: [].concat(action.payload), error: resetError };
        case actions.GET_SEARCH_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default reducer;
