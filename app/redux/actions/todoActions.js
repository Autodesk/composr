import {API_REQUEST, GET_TODOS, POST_TODO, REMOVE_TODO, UPDATE_TODO} from 'constants/action-types';

export function getTodos() {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'getTodos',
            nextActionType: GET_TODOS,
            parameters: {}
        }
    };
}

export function addTodo(category_key, title) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'addTodo',
            nextActionType: POST_TODO,
            parameters: {category_key, title}
        }
    };
}

export function updateTodo() {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'updateTodo',
            nextActionType: REMOVE_TODO,
            parameters: {category_key, title}
        }
    };
}

export function removeTodo(id) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'removeTodo',
            nextActionType: UPDATE_TODO,
            parameters: {id}
        }
    };
}