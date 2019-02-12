
import config from '../config';
const domain = config.domain;

export const userService = {
    loginUser,
    logoutUser,
    registerUser
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
            if (user.token !== null){
                localStorage.setItem('token',user.token);
                return user;
            } else {
                return user.error;
            }
        });
}

function registerUser(user){
    console.log('body',JSON.stringify(user))
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    return fetch(`${domain}/register`,requestOptions)
        .then(handleErrors)
        .then(res => res.json())
        .then(user => {
            console.log('user in fetch',user)
            return user;
        });
}

function logoutUser(){
    console.log('service logout')
    localStorage.removeItem("token");
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    console.log("response of ",response)
    if (!response.ok) {
        if (response.statusText === "Conflict"){
            console.log(typeof(response.statusText))
            throw "Utilisateur déjà existant";
        }
    }
    
    return response;
}