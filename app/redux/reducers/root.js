import { combineReducers } from 'redux-immutablejs';
import { routeReducer } from 'react-router-redux';

import main from 'reducers/main';

const rootReducer = combineReducers({
    routing: routeReducer,
    main
});

export default rootReducer;
