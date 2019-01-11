import React, { Component } from 'react';
import config from '../config/index';
import { userService } from '../services/user.service';
import history from '../helpers/history';


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
const domain = config.domain;

export function loginUser(username, password) {
    return dispatch => {
        dispatch(loginUserBegin());
        userService.loginUser(username,password)
            .then(
                user => {
                    console.log('ici',user)
                    dispatch(loginUserSuccess(user.token));
                    history.push('/')
                },
                error => {
                    dispatch(loginUserFailure(error));
                })
    }
}

export function logoutUser(){
    console.log('logout action')
    return dispatch => {
        userService.logoutUser();
        dispatch(logoutUserSuccess());
    }
}

export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsersBegin = () => ({
    type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: { users: this.fetchUsers() }
});

export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: { error }
});


export const LOGIN_USER_BEGIN = "LOGIN_USER_BEGIN";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

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