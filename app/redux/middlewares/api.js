import { API_REQUEST } from 'constants/action-types';
import API from 'api/api';

const NOT_AUTHORIZED = 401;
const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

function createAction(type, status, payload = {}, parameters, reducerParams) {
    const action = { type };

    switch (status) {
        case PENDING:
            Object.assign(action, { payload: { status: 'pending' } });
            break;
        case SUCCESS:
            Object.assign(action, { payload });
            Object.assign(action.payload, { status: 'success' });

            if (parameters) {
                Object.assign(action, { requestParams: parameters });
            }

            if (reducerParams) {
                Object.assign(action, { reducerParams });
            }

            break;
        case ERROR:
            Object.assign(action, { payload, error: true });
            break;
        default:
            break;
    }

    return action;
}

export default function apiMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        if (action.error && action.payload.status === NOT_AUTHORIZED) {
            return null; // dispatch(unauthorizedSignOut());
        }

        switch (action.type) {
            case API_REQUEST:
                const { apiMethod, parameters, nextActionType, reducerParams } = action.payload;
                const authToken = getState().getIn(['currentUser', 'authToken']);

                dispatch(createAction(nextActionType, PENDING));

                return API[apiMethod](parameters, authToken)
                    .then((response) => {
                        const nextAction = createAction(
                            nextActionType, SUCCESS, response, parameters, reducerParams);

                        dispatch(nextAction);
                        return nextAction;
                    })
                    .catch((error) => {
                        const nextAction = createAction(
                            nextActionType, ERROR, error);

                        dispatch(nextAction);
                        return nextAction;
                    });
            default:
                return next(action);
        }
    };
}
