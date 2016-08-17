import { SIGNUP, SIGNIN, GET_CURRENT_USER, CLEAR_CURRENT_USER } from 'constants/action-types';

export function signUp(email, password) {
    return {
        type: SIGNUP,
        payload: { email, password }
    };
}

export function signIn(email, password) {
    return {
        type: SIGNIN,
        payload: { email, password }
    };
}

export function getCurrentUser(user) {
    return {
        type: GET_CURRENT_USER,
        payload: { user }
    };
}

export function clearCurrentUser() {
    return {
        type: CLEAR_CURRENT_USER,
        payload: {}
    };
}