import Immutable from 'immutable';
import { GET_CATEGORIES, GET_S3_SIGN } from 'constants/action-types';
import { createReducer } from 'redux-immutablejs';

const initialState = Immutable.fromJS({

});

const mainReducer = createReducer(initialState, {
    [GET_CATEGORIES](state, action) {
        if (action.payload.status === 'success') {
            const categories = action.payload;

            return state.set('categories', categories);
        }

        return state;
    },

    [GET_S3_SIGN](state, action) {
        if (action.payload.status === 'success') {
            const sign = action.payload;
            const key = action.requestParams.fileName;
            return state.setIn(['s3Signs', key], sign);
        }

        return state;
    }
});

export default mainReducer;

