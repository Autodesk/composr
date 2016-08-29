import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import persistState from 'redux-localstorage';
import Immutable from 'immutable';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import {updateFrame} from 'actions/mainActions'

// reducers
import rootReducer from 'reducers/root';

const persistStateConfig = {
    key: 'COMPOSR',
    slicer: () => (state) => ({ currentUser: state.toJS().currentUser }),
    deserialize: (state) => Immutable.fromJS(JSON.parse(state)),
    merge: (initialState, persistedState) => initialState.mergeDeep(persistedState)
};

const storeEnhancers = applyMiddleware(
        routerMiddleware(browserHistory)
    );

const store = createStore(
    rootReducer,
    {},
    storeEnhancers);

window.store = store;
export default store;