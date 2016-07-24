import {API_REQUEST, GET_CATEGORIES, FOLLOW_CATEGORY, UNFOLLOW_CATEGORY} from 'constants/action-types';

export function getCategories() {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'getCategories',
            nextActionType: GET_CATEGORIES,
            parameters: {}
        }
    };
}

export function followCategory(categoryKey) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'followCategory',
            nextActionType: FOLLOW_CATEGORY,
            parameters: {categoryKey}
        }
    };
}

export function unfollowCategory(categoryKey) {
    return {
        type: API_REQUEST,
        payload: {
            apiMethod: 'unfollowCategory',
            nextActionType: UNFOLLOW_CATEGORY,
            parameters: {categoryKey}
        }
    };
}