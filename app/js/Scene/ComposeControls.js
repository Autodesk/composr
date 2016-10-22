import ComposeObject from 'js/ComposeObject';
import ComposeCamera from './ComposeCamera';
import StoreAPI from 'StoreAPI';

class ComposeControls extends ComposeObject {
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

        this.camera.controls = this.controls;
    }

    update(ctx) {}

    static type() {
        return 'controls';
    }
}

export default ComposeControls;