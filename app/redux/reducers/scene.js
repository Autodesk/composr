/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import Immutable from 'immutable';

import {
    ADD_SCENE_COMPONENT,
    REMOVE_SCENE_COMPONENT,
    UPDATE_SCENE_COMPONENT,
    RESET_SCENE,
    //UPDATE_FROM_FIREBASE
} from 'constants/action-types';

const INITIAL_STATE = Immutable.Map({
});

const sceneReducer = function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ADD_SCENE_COMPONENT:
            return state.setIn([action.payload.type, action.payload.uuid], action.payload.state);

        case REMOVE_SCENE_COMPONENT:
            return state.deleteIn([action.payload.type, action.payload.uuid]);

        case UPDATE_SCENE_COMPONENT:
            return state.setIn([action.payload.type, action.payload.uuid], action.payload.state);

        //case UPDATE_FROM_FIREBASE:
        //    return state.setIn([action.payload.type, action.payload.uuid], action.payload);

        case RESET_SCENE:
            return INITIAL_STATE;

        default:
            return state
    }

};

export default sceneReducer;