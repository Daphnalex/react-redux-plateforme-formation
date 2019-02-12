import {
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_EDIT_INPUT,
    LOGOUT_USER,
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from "../actions/userActions.js";

const localStorageInitialState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    currentUser: null
}

export default function loginUserReducer(state = localStorageInitialState, action){
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
                token: action.payload.token
            }
        case LOGIN_USER_FAILURE: 
            console.log("action failure",action.payload.error)
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                token: null
            }
        case LOGIN_EDIT_INPUT: 
            return {
                ...state,
                loading: false,
                error: null,
                token: null
            }
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                error: null,
                token: null
            }
        case GET_USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_USER_SUCCESS: 
            return {
                ...state,
                loading: false,
                currentUser: action.payload.currentUser
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: null
            }
        default: 
            return state;
    }
}