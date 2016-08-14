/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import store from 'store';
import {updateData, registerObjectType} from 'actions/mainActions'
import {resetScene} from 'actions/sceneActions';
import VisController from 'js/VisController';

import SceneParser from 'Parsers/SceneParser';

class StoreAPI {
    // Scene Objects actions
    static getObjectById(uuid) {
        return store.getState().runtime.instances[uuid];
    }

    static getObjectByType(type) {
        return store.getState().runtime[type];
    }

    static getController() {
        return store.getState().runtime['controller'][0];
    }

    // Scene Controls actions
    static initVisualizer(element) {
        const controller = StoreAPI.getController();

        controller.init(element);

        element.innerHTML = "";
        element.appendChild(controller.renderer.domElement);

        controller.render();
    }

    static reset() {
        const element = StoreAPI.getController().parentElement;
        store.dispatch(resetScene());

        new VisController();
        StoreAPI.initVisualizer(element);
    }

    static exportToJson() {
        const state = store.getState();

        localStorage.setItem('openComposer',  JSON.stringify({
            scene: state.scene.toJS(),
            dataSource: state.dataSource.settings.toJS()
        }));

        return {
            scene: state.scene.toJS(),
            dataSource: state.dataSource.settings.toJS()
        }
    }

    static loadFromJson() {
        const state = JSON.parse(localStorage.getItem('openComposer'));
        SceneParser.fromJSON(state.scene)

    }

    // data source actions
    static getCurrentData() {
        return store.getState().dataSource.data;
    }

    static pushDataSourceBuffer(buffer) {
        store.dispatch(updateData(buffer));
    }

    static registerObjectClass(name, classObject) {
        store.dispatch(registerObjectType(name, classObject, classObject.type()));
    }

    static getObjectClassesByType(type) {
        return window.store.getState().runtime.objectTypes[type];
    }
}

export default StoreAPI;