export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const FAILED = "FAILED";
export const loadingInprogress = dispatch => {
    dispatch({
        type: LOADING
    });    
}

export const loadingCompleted = dispatch => {
    dispatch({
        type: LOADED
    });    
}

export const loadingFailed = (error) => async (dispatch) => {
    error.statusText =  'Error: '+ error.statusText;
    dispatch({
        type: FAILED,
        payload: error
    });    
}