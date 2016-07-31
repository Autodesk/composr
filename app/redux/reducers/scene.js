/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {ADD_LAYER, REMOVE_LAYER} from 'constants/action-types';

const INITIAL_STATE = {
    layers: []
};

const sceneReducer = function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ADD_LAYER:
            return state;
        case REMOVE_LAYER:
            return state;
        default:
            return state
    }

};

export default sceneReducer;