import {UPDATE_DATA, REGISTER_OBJECT_TYPE, UPDATE_SETTINGS} from 'constants/action-types';

export function updateData(buffer) {
    return {
        type: UPDATE_DATA,
        payload: buffer
    }
}

export function updateSettings(settings) {
    return {
        type: UPDATE_SETTINGS,
        payload: settings
    }
}

export function registerObjectType (name, objectClass, type) {
    return {
        type: REGISTER_OBJECT_TYPE,
        payload: {
            name,
            type,
            objectClass
        }
    }
}