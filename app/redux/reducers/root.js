import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import dataSource from 'reducers/dataSource';
import scene from 'reducers/scene';
import metadata from 'reducers/metadata';
import runtime from 'reducers/runtime';
import currentUser from 'reducers/currentUser';

const rootReducer = combineReducers({
    routing: routerReducer,
    dataSource,
    metadata,
    scene,
    runtime,
    currentUser
});

export default rootReducer;
