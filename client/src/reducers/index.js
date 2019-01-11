import {combineReducers} from "redux";
import users from './userReducer';
import localStorage from './localStorageReducer';

export default combineReducers({
    users,
    localStorage
});