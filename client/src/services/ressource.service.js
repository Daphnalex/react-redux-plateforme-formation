import config from '../config';

const domain = config.domain;

export const ressourceService = {
    getAllRessources
};

function getAllRessources(){
    return fetch(`${domain}/ressources`,{
        method: "GET"
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(ressources => {
        return ressources;
    });
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}