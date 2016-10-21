import ComposeObject from 'js/ComposeObject';
import ComposeCamera from 'js/Scene/ComposeCamera';
import StoreAPI from 'StoreAPI';

class ComposeOrbitControl extends ComposeObject {
    defaults() {
        return {
            minDistance: 1,
            maxDistance: 1500
        }
    }

    componenetDidMount() {
        this.addReference('camera');
        if (this.createReferenceById('camera', this.get('camera')) === undefined) {
            this.camera = new ComposeCamera();
        }

        const element = StoreAPI.getRenderElement();

        this.controls = new THREE.OrbitControls(this.camera.camera, element);
        this.controls.minDistance = this.get('minDistance');
        this.controls.maxDistance = this.get('maxDistance');
    }

    update(ctx) {
        this.controls.update();
    }

    static type() {
        return 'controls';
    }

    onStateChange(changedKeys, prevState) {

    }

    renderUI() {
        return null;
    }
}

export default ComposeOrbitControl;