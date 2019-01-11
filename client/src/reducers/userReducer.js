import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} from "../actions/userActions.js";

const initialState = {
    items: [],
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
        default:
            return state;
    }
}