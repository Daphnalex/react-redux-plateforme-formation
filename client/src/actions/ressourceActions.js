
import { ressourceService } from '../services/ressource.service';
import jwtDecode from 'jwt-decode';

export function getAllRessources() {
    return dispatch => {
        dispatch(getAllRessourcesBegin());
        ressourceService.getAllRessources()
            .then(ressources => {
                dispatch(getAllRessourcesSuccess(ressources))
            }, error => {
                dispatch(getAllRessourcesFailure(error))
            })
    }
}

export function addNewRessource(ressource) {
    return dispatch => {
        dispatch(addRessourceBegin());
        var token = localStorage.token;
        token = jwtDecode(token);
        console.log('token decrypt',token);
        ressourceService.addRessource(ressource,token._id)
            .then(ressource => {
                dispatch(addRessourceSuccess(ressource))
            }, error => {
                dispatch(addRessourceFailure(error))
            })
    }
}

export function getRessource(ressource){
    console.log('get ressource action');
    return dispatch => {
        dispatch(getRessourceBegin());
        ressourceService.getRessource(ressource)
            .then(ressource => {
                dispatch(getRessourceSuccess(ressource))
            }, error => {
                dispatch(getRessourceFailure(error))
            });
    }
}

export function editRessource(ressource){
    console.log('edit ressource action');
    return dispatch => {
        dispatch(editRessourceBegin());
        ressourceService.editRessource(ressource)
            .then(ressource => {
                dispatch(editRessourceSuccess(ressource));
            }, error => {
                dispatch(editRessourceFailure(error))
            });
    }
}

export const GET_ONE_RESSOURCE_BEGIN = "GET_ONE_RESSOURCE_BEGIN";
export const GET_ONE_RESSOURCE_SUCCESS = "GET_ONE_RESSOURCE_SUCCESS";
export const GET_ONE_RESSOURCE_FAILURE = "GET_ONE_RESSOURCE_FAILURE";
export const GET_ALL_RESSOURCES_BEGIN = "GET_ALL_RESSOURCES_BEGIN";
export const GET_ALL_RESSOURCES_SUCCESS = "GET_ALL_RESSOURCES_SUCCESS";
export const GET_ALL_RESSOURCES_FAILURE = "GET_ALL_RESSOURCES_FAILURE";
export const ADD_ONE_RESSOURCE_BEGIN = "ADD_ONE_RESSOURCE_BEGIN";
export const ADD_ONE_RESSOURCE_SUCCESS = "ADD_ONE_RESSOURCE_SUCCESS";
export const ADD_ONE_RESSOURCE_FAILURE = "ADD_ONE_RESSOURCE_FAILURE";
export const EDIT_ONE_RESSOURCE_BEGIN = "EDIT_ONE_RESSOURCE_BEGIN";
export const EDIT_ONE_RESSOURCE_SUCCESS = "EDIT_ONE_RESSOURCE_SUCCESS";
export const EDIT_ONE_RESSOURCE_FAILURE = "EDIT_ONE_RESSOURCE_FAILURE";


export const getRessourceBegin = () => ({
    type: GET_ONE_RESSOURCE_BEGIN
});

export const getRessourceSuccess = (ressource) => ({
    type: GET_ONE_RESSOURCE_SUCCESS,
    payload: { ressource }
});

export const getRessourceFailure = (error) => ({
    type: GET_ONE_RESSOURCE_FAILURE,
    payload: { error }
})

export const getAllRessourcesBegin = () => ({
    type: GET_ALL_RESSOURCES_BEGIN
});

export const getAllRessourcesSuccess = (ressources) => ({
    type: GET_ALL_RESSOURCES_SUCCESS,
    payload: { ressources }
});

export const getAllRessourcesFailure = (error) => ({
    type: GET_ALL_RESSOURCES_FAILURE,
    payload: { error }
})

export const addRessourceBegin = () => ({
    type: ADD_ONE_RESSOURCE_BEGIN
})

export const addRessourceSuccess = (ressource) => ({
    type: ADD_ONE_RESSOURCE_SUCCESS,
    payload: { ressource }
})

export const addRessourceFailure = (error) => ({
    type: ADD_ONE_RESSOURCE_FAILURE,
    payload: { error }
}) 

export const editRessourceBegin = () => ({
    type: EDIT_ONE_RESSOURCE_BEGIN
});

export const editRessourceSuccess = (ressource) => ({
    type: EDIT_ONE_RESSOURCE_SUCCESS,
    payload:  { ressource }
})

export const editRessourceFailure = (error) => ({
    type: EDIT_ONE_RESSOURCE_FAILURE,
    payload: { error }
})