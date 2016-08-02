import {UPDATE_DATA} from 'constants/action-types';

export function updateData(buffer) {
    return {
        type: UPDATE_DATA,
        payload: buffer
    }
}