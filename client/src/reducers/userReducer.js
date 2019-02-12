import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    END_REGISTER_USER,

} from "../actions/userActions.js";

const initialState = {
    items: [],
    register: null,
    loading: false,
    error: null
}

export default function fetchUsersReducer(state = initialState, action){
    switch(action.type) {
        case FETCH_USERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.users
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            }
        case REGISTER_USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                register: action.payload.message,
                error: null
            }
        case REGISTER_USER_FAILURE:
            console.log("reducer error",action.payload.error);
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case END_REGISTER_USER:
            return {
                ...state,
                register: null
            }
        default:
            return state;
    }
}