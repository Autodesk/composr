/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import connector from 'js/connector';
import store from 'store';
import Immutable from 'immutable';
import {updateSceneComponent, addSceneComponent, removeSceneComponent} from 'redux/actions/sceneActions';

class ComposeObject {
    constructor(options = {}) {
        this._state = Immutable.Map({
            uuid: options.uuid || THREE.Math.generateUUID(),
            name: options.name || '',
            type: this.type
        });

        this.needsUpdate = false;

        store.dispatch(addSceneComponent(this));
        this.connector = new connector(this.selector.bind(this), this.onStateChange.bind(this));
    }

    update() {

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

    destroy() {
        store.dispatch(removeSceneComponent(this));
    }

    setState(state, silent = false) {
        this._state = this._state.merge(state);
        if (!silent) {
            store.dispatch(updateSceneComponent(this));
        }
    }

    static type() {
        return 'object'
    }

    get type() {
        return this.constructor.type();
    }

    selector(state) {
        return state.scene.getIn([this.type, this.uuid]);
    }

    onStateChange() {

    }

    fromStore() {

    }


    // lifecycle functions
    objectWillUnmount() { }
}

export default ComposeObject;