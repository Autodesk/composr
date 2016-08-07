/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {ADD_SCENE_COMPONENT, REMOVE_SCENE_COMPONENT} from 'constants/action-types';
import {remove} from 'lodash/array';

const INITIAL_STATE = {
    instances: {}
};

const runtimeReducer = function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ADD_SCENE_COMPONENT:
            console.log(`added ${action.payload.type}`);
            state.instances[action.payload.uuid] = action.payload;
            if (state[action.payload.type] === undefined) {
                state[action.payload.type] = [];
            }
            state[action.payload.type].push(action.payload);

            return state;

        case REMOVE_SCENE_COMPONENT:
            console.log(`removed ${action.payload.type}`);

            action.payload.objectWillUnmount();

            delete state.instances[action.payload.uuid];
            remove(state[action.payload.type], (o)=> action.payload.uuid === o.uuid);

            return state;
        default:
            return state
    }

};

export default runtimeReducer;


