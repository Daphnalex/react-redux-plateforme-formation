import { userService } from '../services/user.service';
import history from '../helpers/history';
import jwtDecode from 'jwt-decode';

// export function fetchUsers() {
//     return dispatch => {
//         dispatch(fetchUsersBegin());
//         return fetch(`${domain}/users`, { method: 'GET' })
//             .then(handleErrors)
//             .then(res => res.json())
//             .then(data => {
//                 dispatch(fetchUsersSuccess(data.users));
//                 console.log('data', data);
//                 return data.users;
//             })
//             .catch(error => dispatch(fetchUsersFailure(error)));
//     };
// };

export function getCurrentUser(token) {
    return dispatch => {
        dispatch(getCurrentUserBegin());
        if (token) {
            var currentUser = jwtDecode(token);
            console.log('currentUser',currentUser)
            dispatch(getCurrentUserSuccess(currentUser));
        } else {
            var error = "Token non reçu"
            dispatch(getCurrentUserFailure(error))
        }
    }
}

export function loginUser(username, password) {
    return dispatch => {
        dispatch(loginUserBegin());
        userService.loginUser(username,password)
            .then(
                user => {
                    console.log('ici',user)
                    if (user.token){
                        console.log('un token')
                        var token = jwtDecode(user.token);
                        console.log('token decrypt',token)
                        dispatch(loginUserSuccess(token));
                        history.push('/')
                    } else {
                        console.log('user token is null',user)
                        dispatch(loginUserFailure(user));
                    }
                },
                error => {
                    console.log('error');
                    console.log(error);
                    dispatch(loginUserFailure(error));
                    history.push('/login');
                })
    }
}

export function registerUser(user) {
    console.log('user in action register',user);
    return dispatch => {
        dispatch(registerUserBegin());
        userService.registerUser(user)
            .then(user => {
                console.log('user',user);
                var message = "Utilisateur créé avec succès";
               dispatch(registerUserSuccess(user,message));
            },
            error => {
                console.log('error in user action',error)
                dispatch(registerUserFailure(error));
                history.push('/register');
            }
        )
    }
}

export function endRegisterUser(){
    return dispatch => {
        dispatch(endRegisterSuccess());
        history.push('/login')
    }
}

export function logoutUser(){
    console.log('logout action')
    return dispatch => {
        userService.logoutUser();
        dispatch(logoutUserSuccess());
    }
}


export function editInputUser(){
    return dispatch => {
        dispatch(editInput())
    }
}


export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsersBegin = () => ({
    type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS
});

export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: { error }
});

export const GET_USER_BEGIN = "GET_USER_BEGIN";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getCurrentUserBegin = () => ({
    type: GET_USER_BEGIN
});

export const getCurrentUserSuccess = (currentUser) => ({
    type: GET_USER_SUCCESS,
    payload: { currentUser }
})

export const getCurrentUserFailure = (error) => ({
    type: GET_USER_FAILURE,
    payload: { error }
})


export const LOGIN_USER_BEGIN = "LOGIN_USER_BEGIN";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_EDIT_INPUT = "LOGIN_EDIT_INPUT";

export const loginUserBegin = () => ({
    type: LOGIN_USER_BEGIN
});

export const loginUserSuccess = (token) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { token }
});

export const loginUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: { error }
});

export const logoutUserSuccess = () => ({
    type: LOGOUT_USER
});

export const editInput = () => ({
    type: LOGIN_EDIT_INPUT
});

export const REGISTER_USER_BEGIN = "REGISTER_USER_BEGIN";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
export const END_REGISTER_USER = "END_REGISTER_USER";

export const registerUserBegin = () => ({
    type: REGISTER_USER_BEGIN
});

export const registerUserSuccess = (user,message) => ({
    type: REGISTER_USER_SUCCESS,
    payload: {user: user, message: message}
});

export const registerUserFailure = (error) => ({
    type: REGISTER_USER_FAILURE,
    payload: {error}
});

export const endRegisterSuccess = () => ({
    type: END_REGISTER_USER
})