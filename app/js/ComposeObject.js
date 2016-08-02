/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import connector from 'js/connector';
import store from 'store';
import Immutable from 'immutable';

class ComposeObject {
    constructor(options) {
        this.connector = new connector(this.selector, this.onStateChange);

        this._state = Immutable.Map({
            uuid: options.uuid || THREE.Math.generateUUID(),
            name: options.name || '',
            type: this.type
        });
    }

    get uuid() {
        return this._state.get('uuid');
    }

    get name() {
        return this._state.get('name');
    }

    get state() {
        return this._state;
    }

    get type() {
        return 'object';
    }

    selector(state) {
        return state;
    }

    onStateChange() {

    }

    setState(state) {

    }

    fromStore() {

    }
}

export default ComposeObject;