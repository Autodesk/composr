/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import store from 'store';

class StoreAPI {
    static getObjectById(uuid) {
        return store.getState().runtime.instances[uuid];
    }

    static getObjectByType(type) {
        return store.getState().runtime[type];
    }

    static getController() {
        return store.getState().runtime['controller'][0];
    }

    static getCurrentData() {
        return store.getState().dataSource.data;
    }
}

export default StoreAPI;