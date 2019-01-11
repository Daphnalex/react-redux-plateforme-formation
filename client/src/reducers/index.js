import {combineReducers} from "redux";
import users from './userReducer';
import localStorage from './localStorageReducer';
import ressources from './ressourceReducer';

export default combineReducers({
    users,
    localStorage,
    ressources
});