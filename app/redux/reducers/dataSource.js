/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

import {UPDATE_FRAME} from 'constants/action-types';

const INITIAL_STATE = {
    data: []
};

const MAX_DATA_SIZE = 50;

const dataSourceReducer = function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_FRAME:
            if (state.data.length > MAX_DATA_SIZE) {
                state.data.shift();
            }
            state.data.push(action.payload);

            return Object.assign({}, state);
        default:
            return state
    }

};

export default dataSourceReducer;


