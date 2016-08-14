/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import connector from 'js/connector';
import store from 'store';
import Immutable from 'immutable';
import {updateSceneComponent, addSceneComponent, removeSceneComponent} from 'redux/actions/sceneActions';

import StoreAPI from 'StoreAPI';
import {defaults} from 'lodash';

class ComposeObject {
    constructor(options = {}) {
        this._state = Immutable.fromJS( ComposeObject.setDefaults(options, this.defaultOptions) );

        // marks dirty object
        this.needsUpdate = false;

        // used to provide change callback with state change info
        this._stateContext = {
            changedKeys: [],
            prevState: this._state
        }


        store.dispatch(addSceneComponent(this));

        // let system load before start listening to state changes
        setTimeout(()=>{
            this.connector = new connector(this.selector.bind(this),
                () => this.onStateChange(this._stateContext.changedKeys, this._stateContext.prevState));
        }, 10)

    }

    static setDefaults(options, defautOptions) {
        return defaults(options, defautOptions)
    }

    static type() {
        return 'object'
    }

    // TODO: maybe add this function through StoreAPI so it'll not 'know' about it.
    static registerObject(name, classObject) {
        // TODO: timeout to let StoreAPI build. should find better solution
        setTimeout(() => StoreAPI.registerObjectClass(name, classObject) ,1);
    }

    get defaultOptions() {
      return {
          constructorName: this.constructor.name,
          uuid: THREE.Math.generateUUID(),
          name: `A ${this.type}`,
          type: this.type
      }
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
        this.connector.disconnect();
        store.dispatch(removeSceneComponent(this));
    }

    setState(state, silent = false) {
        this._stateContext.changedKeys = Object.keys(state);
        this._stateContext.prevState = this._state;

        this._state = this._state.merge(state);
        if (!silent) {
            store.dispatch(updateSceneComponent(this));
        }
    }

    get type() {
        return this.constructor.type();
    }

    selector(state) {
        return state.scene.getIn([this.type, this.uuid]);
    }

    onStateChange(changedKeys, prevState) {

    }

    // lifecycle functions
    objectWillUnmount() { console.log('objectWillUnmount', this.uuid) }
}

export default ComposeObject;