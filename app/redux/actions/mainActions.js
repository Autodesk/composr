import {UPDATE_FRAME} from 'constants/action-types';

export function updateFrame(buffer) {
    return {
        type: UPDATE_FRAME,
        payload: buffer
    }
}