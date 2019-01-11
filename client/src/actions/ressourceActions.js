
import config from '../config';
import { ressourceService } from '../services/ressource.service';
import history from '../helpers/history';
import jwtDecode from 'jwt-decode';

const domain = config.domain;

export function getAllRessources(){
    console.log('get all ressources');
    return dispatch => {
        dispatch(getAllRessourcesBegin());
        ressourceService.getAllRessources()
            .then(ressources => {
                dispatch(getAllRessourcesSuccess(ressources))
            },error =>{
                dispatch(getAllRessourcesFailure(error))
            })
    }
}

export const GET_ALL_BEGIN = "GET_ALL_BEGIN";
export const GET_ALL_SUCCESS = "GET_ALL_SUCCESS";
export const GET_ALL_FAILURE = "GET_ALL_FAILURE";

export const getAllRessourcesBegin = () => ({
    type: GET_ALL_BEGIN
});

export const getAllRessourcesSuccess = (ressources) => ({
    type: GET_ALL_SUCCESS,
    payload: { ressources }
});

export const getAllRessourcesFailure = (error) => ({
    type: GET_ALL_FAILURE,
    payload: { error }
})