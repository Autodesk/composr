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

//
//setTimeout( ()=> {
//    Firebase.getData('/scene', (data) => {
//
//        StoreAPI.loadFromJson(JSON.stringify(data));
//
//        new connector(
//            (state) => state.scene,
//            () => {
//                Firebase.set('/scene', store.getState().scene.toJS())
//            } );
//    })
//}, 1250)

//setTimeout( ()=> {
//    Firebase.getData('/scene', (data) => {
//        localStorage.setItem('openComposer2', JSON.stringify(data));
//        window.load = StoreAPI.loadFromJson;
//        console.log('firebase savet to openComposr2');
//        //StoreAPI.loadFromJson(JSON.stringify(data))
//    })
//}, 1000);

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