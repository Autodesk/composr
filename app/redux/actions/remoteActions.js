/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {
    REMOTE_FETCH,
    REMOTE_SUCCESS,
    REMOTE_ERROR,
} from 'constants/action-types';

export function remoteFetch() {
    return {
        type: REMOTE_FETCH,
        payload: {isFetching: true}
    }
}

export function remoteSuccess() {
    return {
        type: REMOTE_SUCCESS,
        payload: {isFetching: false}
    }
}

export function remoteError() {
    return {
        type: REMOTE_ERROR,
        payload: StoreAPI.getObjectById(uuid)
    }
}