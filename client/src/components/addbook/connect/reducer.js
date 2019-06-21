import * as actions from './actions';
const initialState = {
    book: { _id: '', name: '', price: '', author: '', description: '', count: '' },
    bookInfoResponded: false,
};
const reducer = (state = initialState, action) => {
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
            return state;
        case actions.UPDATE_BOOK_FAILED:
            return { ...state, error: action.payload };
        case actions.CREATE_BOOK_SUCCESS || actions.RESET_BOOK:
            return { ...state, book: resetBook};
        case actions.RESET_BOOK:
            return { ...state, book: resetBook};
        case actions.CREATE_BOOK_FAILED:
            return { ...state, error: action.payload };
        case actions.GET_BOOK_INFO_SUCCESS:
            return { ...state, book: action.payload, bookInfoResponded: true};
        case actions.GET_BOOK_INFO_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default reducer;