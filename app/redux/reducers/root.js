import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux';

import dataSource from 'reducers/dataSource';
import scene from 'reducers/scene';
import metadata from 'reducers/metadata';
import runtime from 'reducers/runtime';

const rootReducer = combineReducers({
    routing: routeReducer,
    dataSource,
    scene,
    metadata,
    runtime
});

export default rootReducer;
