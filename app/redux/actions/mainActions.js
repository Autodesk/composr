import {UPDATE_DATA, REGISTER_OBJECT_TYPE, UPDATE_DATASOURCE_SETTINGS, UPDATE_METADATA} from 'constants/action-types';

export function updateData(buffer) {
    return {
        type: UPDATE_DATA,
        payload: buffer
    }
}

export function updateMetadata(settings) {
    return {
        type: UPDATE_METADATA,
        payload: settings
    }
}

export function updateDatasourceSettings(settings) {
    return {
        type: UPDATE_DATASOURCE_SETTINGS,
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