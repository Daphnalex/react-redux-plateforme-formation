import {
    GET_ALL_BEGIN,
    GET_ALL_SUCCESS,
    GET_ALL_FAILURE
} from "../actions/ressourceActions";

const initialState = {
    ressources: [],
    loading: false,
    error: null
}

export default function fetchRessourcesReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_BEGIN:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                ressources: action.payload.ressources
            }
        case GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}