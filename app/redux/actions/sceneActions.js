/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import {
    ADD_SCENE_COMPONENT,
    REMOVE_SCENE_COMPONENT,
    UPDATE_SCENE_COMPONENT
} from 'constants/action-types';

export function addSceneComponent(layer) {
    return {
        type: ADD_SCENE_COMPONENT,
        payload: layer
    }
}

export function removeSceneComponent(layerUuid) {
    return {
        type: REMOVE_SCENE_COMPONENT,
        payload: layerUuid
    }
}

export function updateSceneComponent(tick) {
    return {
        type: UPDATE_SCENE_COMPONENT,
        payload: tick
    }
}