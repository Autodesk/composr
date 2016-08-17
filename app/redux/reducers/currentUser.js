import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';
import { GET_CURRENT_USER, CLEAR_CURRENT_USER } from 'constants/action-types';

const initialState = Immutable.fromJS({
    uuid: null,
    company: null,
    email: null,
    fullName: null,
    avatar: null,
    role: null,
    authToken: null
});

const currentUserReducer = createReducer(initialState, {

    [GET_CURRENT_USER](state, action) {
        const { user } = action.payload;
        console.log('get current user', action);

        return Immutable.fromJS({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid
        });
    },

    [CLEAR_CURRENT_USER](state, action) {
        console.log('clear user');
        return initialState;
    }
});

export default currentUserReducer;

