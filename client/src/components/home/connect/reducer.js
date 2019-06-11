import * as actions from './actions';
const initialState = {
    books: [],
    offset: 0,
    error: { status: '', statusText: '' }
};
const reducer = (state = initialState, action) => {
    let success =  {status: 200, statusText: 'SUCCESS'};
    switch (action.type) {
        case actions.GET_BOOKS_SUCCESS:
            let books = state.books;
            if(state.offset === 0  ) {
                books = [];
            }
            return { ...state, books: books.concat(action.payload.books), offset:action.payload.offset, error: success };
        case actions.GET_BOOKS_FAILED:
            return { ...state, books: [], error: action.payload };
        default:
            return state;
    }
};

export default reducer;