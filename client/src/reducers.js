/* eslint-disable no-labels */
import {combineReducers} from 'redux';
import libraryReducer from './components/home/connect/reducer';
import bookReducer from './components/addbook/connect/reducer';
export const reducers = combineReducers({
    libraryReducer,
    bookReducer
});