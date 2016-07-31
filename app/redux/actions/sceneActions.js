/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import {} from 'constants/action-types';

export function updateFrame(buffer) {
    return {
        type: UPDATE_FRAME,
        payload: buffer
    }
}