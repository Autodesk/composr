/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import connector from 'js/connector';

class ComposeObject {
    constructor(options) {
        this.connector = new connector(this.selector, this.onStateChange);
        this.state = {};

        this.uuid = options.uuid || THREE.Math.generateUUID();

        this.name = options.name || '';
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