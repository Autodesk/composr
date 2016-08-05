import 'js/3rdParty/OrbitControls';
import MicrophoneSource from './dataSources/MicrophoneSource';

import connector from 'js/connector';
import ComposeObject from 'js/ComposeObject';
import StoreAPI from 'StoreAPI';

class VisController extends ComposeObject {
    constructor(options = {}) {
        super(options)
        this.dataSource = new MicrophoneSource();
    }

    get type() {
        return 'controller';
    }

    get data() {
        return this.dataSource.data;
    }

    onLayerAdded(layer) {

    }

    init(parentElement) {
        this.renderer = this.initThreeRenderer(parentElement);
        this.initThreeScene();

        // TODO: move controls to different init with options to set the controller
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 1;
        this.controls.maxDistance = 15000;
    }

    initThreeRenderer(parentElement) {
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(parentElement.offsetWidth, parentElement.offsetHeight);
        renderer.setClearColor(0x000000, 0.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.autoClear = false;

        return renderer;
    }

    initThreeScene() {
        this.scene = new THREE.Scene();

        this.initCamera();
        this.initLighting();
    }

    initLighting() {
        const lights = [];
        lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[1] = new THREE.PointLight( 0xf28800, 1, 0 );
        lights[2] = new THREE.PointLight( 0x00ffff, 1, 0 );

        lights[0].position.set( 0, 200, 0 );
        lights[1].position.set( 100, 200, 100 );
        lights[2].position.set( -100, -200, -100 );

        lights.forEach((l) => this.scene.add(l));
    }

    initCamera() {
        const size = this.renderer.getSize();

        this.camera = new THREE.PerspectiveCamera(
            45, size.width / size.height, 0.1, 15000
        );
    }

    update() {
        const layers = StoreAPI.getObjectByType('layer');
        const ctx = {
            data: StoreAPI.getCurrentData()
        }

        if (layers) {
            layers.forEach((o) => o.update(ctx));
        }
    }

    render() {
        if (!this.state.pause) {
            requestAnimationFrame(() => this.render());
        }

        this.update();
        this.controls.update();

        this.renderer.clear()
        this.renderer.render(this.scene, this.camera);
    }
}

export default VisController;
