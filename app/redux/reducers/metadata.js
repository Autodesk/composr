/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import Immutable from 'immutable';
import {UPDATE_METADATA} from 'constants/action-types';

const INITIAL_STATE = new Immutable.fromJS({
    compName: 'Composition',
});

const metadataReducer = function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_METADATA:
            return state.merge(action.payload);

        default:
            return state
    }

};

export default metadataReducer;


