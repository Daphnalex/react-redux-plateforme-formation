import config from '../config';

const domain = config.domain;

export const classSchoolService = {
    getAllClasses
}

function getAllClasses(){
    return fetch(`${domain}/classes`,{
        method: 'GET'
    }).then(handleErrors)
      .then((res) => res.json())
      .then(classes =>  {
          return classes;
      })

}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}