import config from '../config';

const domain = config.domain;

export const ressourceService = {
    getAllRessources,
    addRessource,
    editRessource,
    getRessource
};

function getRessource(ressourceId){
    return fetch(`${domain}/ressources/${ressourceId}`,
    {
        method: "GET"
    }).then(handleErrors)
    .then(res => res.json())
    .then(ressource => {
        return ressource;
    });
}

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

function addRessource(ressource,authorId){
    console.log('ressource in service',ressource)
    return fetch(`${domain}/ressources`, {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(ressource),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(handleErrors)
        .then(res => res.json())
        .then(ressource => {
            return ressource;
        });
}

function editRessource(ressource){
    console.log('ressource reçu par le service',ressource)
    return fetch(`${domain}/ressources/${ressource._id}`,{
        method: 'PUT',
        mode: 'CORS',
        body: JSON.stringify(ressource),
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(handleErrors)
        .then(res => res.json())
        .then(ressource => {
            console.log('ressource reçu du back',ressource)
            return ressource;
        });
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}