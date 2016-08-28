/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import store from 'store';
import {updateData, registerObjectType} from 'actions/mainActions'
import {resetScene, updatePlayback} from 'actions/sceneActions';
import {remoteFetch, remoteSuccess} from 'actions/remoteActions';
import VisController from 'js/VisController';

import SceneParser from 'Parsers/SceneParser';
import DataSourceParser from 'Parsers/DataSourceParser';
import Firebase from 'firebase/firebase';

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

    static getPlaybackState() {
        return store.getState().runtime.playback;
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

    static loadState(state) {
        store.dispatch(updatePlayback({ isPlaying: false }));
        SceneParser.fromJSON( state.scene );
        DataSourceParser.fromJSON(state.dataSource);

        setTimeout( () => {
            store.dispatch(updatePlayback({ isPlaying: true }));
        }, 1)
    }

    static saveStateRemote(remotePath) {
        store.dispatch(remoteFetch());
        Firebase.set(`/${remotePath}`, StoreAPI.exportToJson(), () => store.dispatch(remoteSuccess()))
    }

    static loadStateRemote(remotePath, callback) {
        store.dispatch(remoteFetch());

        Firebase.getData(`/${remotePath}`, (data) => {
            if (data != null) {
                StoreAPI.loadState(data);
            }

            store.dispatch(remoteSuccess());

            if (callback) callback(data);
        });
    }

    static listenRemote(remotePath) {
        Firebase.onChange( remotePath, (data) => {
            if (data != null) {
                StoreAPI.loadState(data);
            }
        });
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


    // user actions
    static getCurrentUser() {
        return store.getState().currentUser;
    }

    static logOutCurrentUser() {

    }
}

export default StoreAPI;