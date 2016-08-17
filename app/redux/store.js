import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import persistState from 'redux-localstorage';
import Immutable from 'immutable';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import {updateFrame} from 'actions/mainActions'
import FirebaseMiddlware from 'middleware/firebase';
import Firebase from 'firebase/firebase';
import connector from 'js/connector';
import StoreAPI from 'StoreAPI';

// reducers
import rootReducer from 'reducers/root';

const persistStateConfig = {
    key: 'COMPOSR',
    slicer: () => (state) => ({ currentUser: state.toJS().currentUser }),
    deserialize: (state) => Immutable.fromJS(JSON.parse(state)),
    merge: (initialState, persistedState) => initialState.mergeDeep(persistedState)
};

const storeEnhancers = applyMiddleware(
        FirebaseMiddlware,
        routerMiddleware(browserHistory)
    );


const store = createStore(
    rootReducer,
    {},
    storeEnhancers);

window.store = store;
export default store;

//x

//new connector(
//        (state) => state.scene,
//        () => {
//            Firebase.set('/scene', store.getState().scene.toJS())
//        } );

//Firebase.onChange('/scene', (data) => {
//    console.log('changed', data)
//});
//
//Firebase.onAdd('/scene', (data) => {
//    console.log('added', data)
//});