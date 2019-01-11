

import config from '../config';
const domain = config.domain;

export const userService = {
    loginUser,
    logoutUser,
    // getAllUser,
    // getByIdUser,
    // updateUser,
    // deleteUser
};

function loginUser(username,password){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${domain}/login`,requestOptions)
        .then(handleErrors)
        .then(res => res.json())
        .then(user => {
            console.log('user in service',user);
            localStorage.setItem('token_id',user.token);
            return user;
        });
}

function logoutUser(){
    console.log('service logout')
    localStorage.removeItem("token_id");
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}