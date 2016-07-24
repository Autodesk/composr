import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import persistState from 'redux-localstorage';
import Immutable from 'immutable';
import { syncHistory } from 'react-router-redux';

// reducers
import rootReducer from 'reducers/root';

// middlewares
import API from 'middlewares/api';

const persistStateConfig = {
    key: 'COMPOSR',
    slicer: () => (state) => ({ currentUser: state.toJS().currentUser }),
    deserialize: (state) => Immutable.fromJS(JSON.parse(state)),
    merge: (initialState, persistedState) => initialState.mergeDeep(persistedState)
};

const storeEnhancers = compose(
    applyMiddleware(
        syncHistory(browserHistory),
        API
    ),
    persistState(null, persistStateConfig)
);

const store = createStore(rootReducer, Immutable.fromJS({}), storeEnhancers);
window.store = store;
export default store;
