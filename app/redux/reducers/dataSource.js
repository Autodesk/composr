/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {UPDATE_DATA} from 'constants/action-types';

const INITIAL_STATE = {
    data: [],
    maxDataSize: 50
};

const dataSourceReducer = function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_DATA:
            if (state.data.length > state.maxDataSize) {
                state.data.shift();
            }
            state.data.push(action.payload);

            return Object.assign({}, state);
        default:
            return state
    }

};

export default dataSourceReducer;


