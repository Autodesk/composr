import {API_REQUEST, GET_FEARS, POST_FEAR, REMOVE_FEAR, UPDATE_FEAR, GET_S3_SIGN} from 'constants/action-types';

export function getFears() {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'getFears',
            nextActionType: GET_FEARS,
            parameters: {  }
        }
    };
}

export function postFear(category_key, title, tags, description, feeling, asset_url, asset_type, todo_uuid) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'postFear',
            nextActionType: POST_FEAR,
            parameters: {category_key, title, tags, description, feeling, asset_url, asset_type, todo_uuid}
        }
    };
}

export function updateFear(id, category_key, title, tags, description, asset_url, asset_type, todo_uuid, feeling) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'updateFear',
            nextActionType: UPDATE_FEAR,
            parameters: {id, category_key, title, tags, description, asset_url, asset_type, todo_uuid, feeling}
        }
    };
}

export function removeFear(id) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'removeFear',
            nextActionType: REMOVE_FEAR,
            parameters: { id }
        }
    };
}

export function getS3Sign(fileName, fileType) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'getS3Sign',
            nextActionType: GET_S3_SIGN,
            parameters: {fileName, fileType}
        }
    }
}