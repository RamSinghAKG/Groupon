import * as actions from './actions';
const initialState = {
    books: [],
    offset: 0,
    error: { status: '', statusText: '' }
};
const reducer = (state = initialState, action) => {
    let resetError = { status: '', statusText: '' };
    switch (action.type) {
        case actions.GET_BOOKS_SUCCESS:
            let books = state.books;
            if (action.payload.offset === 0) {
                books = [];
            }
            return { ...state, books: books.concat(action.payload.books), offset: action.payload.offset, error: resetError };
        case actions.GET_BOOKS_FAILED:
            return { ...state, books: [], error: action.payload };
        case actions.GET_SEARCH_SUCCESS:
            return { ...state, books: [].concat(action.payload), error: resetError };
        case actions.GET_SEARCH_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default reducer;
