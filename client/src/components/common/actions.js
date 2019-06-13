export const LOADING = "LOADING";
export const LOADED = "LOADED";
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