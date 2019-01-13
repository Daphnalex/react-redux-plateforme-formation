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
    return fetch(`${domain}/ressources`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: ressource.title,
            description: ressource.description,
            order: ressource.order,
            typeOfRessource: ressource.typeOfRessource,
            authorId: authorId,
            shareRessource: ressource.shareRessource,
            questions: ressource.questions
        })
    })
}

function editRessource(ressource){
    return fetch(`${domain}/ressources/${ressource._id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: ressource.title,
            description: ressource.description,
            order: ressource.order,
            typeOfRessource: ressource.typeOfRessource,
            authorId: ressource.authorId,
            shareRessource: ressource.shareRessource,
            questions: ressource.questions
        })
    })
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}