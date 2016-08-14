/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import {UPDATE_DATA} from 'constants/action-types';
import Immutable from 'immutable';

const INITIAL_STATE = {
    data: [],
    settings: new Immutable.fromJS({
        maxDataSize: 150
    })

};

const dataSourceReducer = function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_DATA:
            if (state.data.length > state.settings.get('maxDataSize')) {
                state.data.shift();
            }
            state.data.push(new Float32Array(action.payload));

            return Object.assign({}, state);
        default:
            return state
    }

};

export default dataSourceReducer;


