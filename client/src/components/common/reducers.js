import * as actions from './actions';
const initialState = {
    isLoading: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOADING:
            return { ...state, isLoading: true };
        case actions.LOADED:
                return { ...state, isLoading: false };
        default:
            return state;
    }
};

export default reducer;