import { SIGNUP, SIGNIN, CLEAR_USER } from 'constants/action-types';
import FirebaseAPI from 'firebase/firebase';
export default function firebaseMiddleware({ getState, dispatch }) {
    return (next) => (action) => {
        switch (action.type) {
            case SIGNUP:
                FirebaseAPI.createUser(action.payload.email, action.payload.password);
                break;
            case SIGNIN:
                FirebaseAPI.signIn(action.payload.email, action.payload.password);
                break;
            case CLEAR_USER:
                FirebaseAPI.signOut();
                break;
            default:
                break;
        }
        return next(action);
    };
}