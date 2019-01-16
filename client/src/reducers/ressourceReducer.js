import {
    GET_ONE_RESSOURCE_BEGIN,
    GET_ONE_RESSOURCE_SUCCESS,
    GET_ONE_RESSOURCE_FAILURE,
    GET_ALL_RESSOURCES_BEGIN,
    GET_ALL_RESSOURCES_SUCCESS,
    GET_ALL_RESSOURCES_FAILURE,
    ADD_ONE_RESSOURCE_BEGIN,
    ADD_ONE_RESSOURCE_SUCCESS,
    ADD_ONE_RESSOURCE_FAILURE,
    EDIT_ONE_RESSOURCE_BEGIN,
    EDIT_ONE_RESSOURCE_SUCCESS,
    EDIT_ONE_RESSOURCE_FAILURE
} from "../actions/ressourceActions";

const initialState = {
    ressources: [],
    loading: false,
    error: null,
    currentRessource: null
}

export default function fetchRessourcesReducer(state = initialState, action){
    console.log('action type',action.payload)
    switch(action.type){
        case GET_ONE_RESSOURCE_BEGIN:
            return {
                ...state,
                loading: true
            }
        case GET_ONE_RESSOURCE_SUCCESS:
            return {
                ...state,
                loading: false,
                currentRessource: action.payload.ressource
            }
        case GET_ONE_RESSOURCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case GET_ALL_RESSOURCES_BEGIN:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_RESSOURCES_SUCCESS:
            return {
                ...state,
                loading: false,
                ressources: action.payload.ressources
            }
        case GET_ALL_RESSOURCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case ADD_ONE_RESSOURCE_BEGIN:
            return {
                ...state,
                loading: true
            }
        case ADD_ONE_RESSOURCE_SUCCESS: 
            return {
                ...state,
                loading: false,
                ressources: [...state.ressources, action.payload.ressource]
            }
        case ADD_ONE_RESSOURCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case EDIT_ONE_RESSOURCE_BEGIN: 
            return {
                ...state,
                loading: true
            }
        case EDIT_ONE_RESSOURCE_SUCCESS:
            state.ressources[action.payload.index] = {
                ...state.ressources[action.payload.index],
                ...action.payload.ressource
            }
            console.log('in reducer',state.ressources);
            console.log('ressource envoyé',action.payload.ressource)
            return {
                ...state,
                loading: false,
                currentRessource: action.payload.ressource,
                ressources: state.ressources
            }
        case EDIT_ONE_RESSOURCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}