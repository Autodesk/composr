/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import Firebase from './firebase';

const generateUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

export function getNewSignupRef() {
    const pathId = generateUUID();

    return Firebase.firebase.database().ref(`waitlist/${pathId}`);
}

export function getVisualizaionRef(vid, isPrivate = true ) {

}

export function createComposition() {

}