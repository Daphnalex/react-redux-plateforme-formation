import {
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER
} from "../actions/userActions.js";

const localStorageInitialState = {
    token_id: localStorage.getItem("token_id"),
    loading: false,
    error: null
}

export default function loginUserReducer(state = localStorageInitialState, action){
    console.log('state',state)
    switch(action.type) {
        case LOGIN_USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                token_id: action.payload.token
            }
        case LOGIN_USER_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                token_id: null
            }
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                error: null,
                token_id: null
            }
        default: 
            return state;
    }
}