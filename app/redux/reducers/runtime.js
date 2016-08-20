/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {ADD_SCENE_COMPONENT, REMOVE_SCENE_COMPONENT, RESET_SCENE, REGISTER_OBJECT_TYPE} from 'constants/action-types';
import {remove} from 'lodash/array';

const INITIAL_STATE = () => ( {
    instances: {},
    objectTypes: {}
});

const runtimeReducer = function(state = INITIAL_STATE(), action) {
    switch(action.type) {
        case ADD_SCENE_COMPONENT:
            console.info(`Runtime Reducer: added ${action.payload.type}`);
            state.instances[action.payload.uuid] = action.payload;
            if (state[action.payload.type] === undefined) {
                state[action.payload.type] = [];
            }

            state[action.payload.type].push(action.payload);

            action.payload.componenetWillMount();
            setTimeout(() => action.payload._componenetDidMount(), 1)

            return state;

        case REMOVE_SCENE_COMPONENT:
            console.info(`Runtime Reducer: removed ${action.payload.type}`);

            action.payload.objectWillUnmount();

            delete state.instances[action.payload.uuid];
            remove(state[action.payload.type], (o)=> action.payload.uuid === o.uuid);

            return state;

        case RESET_SCENE:
            for (let i of Object.keys(state.instances)) {
                state.instances[i].objectWillUnmount();
            }

            return INITIAL_STATE();

        case REGISTER_OBJECT_TYPE:
            console.info(`Registered Class Type`);

            if (state.objectTypes[action.payload.type] === undefined) {
                state.objectTypes[action.payload.type] = {};
            }
            state.objectTypes[action.payload.type][action.payload.name] = action.payload.objectClass;

            return state;


        default:
            return state
    }

};

export default runtimeReducer;


