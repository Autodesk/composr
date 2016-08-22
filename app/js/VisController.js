import 'js/3rdParty/OrbitControls';
import MicrophoneSource from './dataSources/MicrophoneSource';

import connector from 'js/connector';
import ComposeObject from 'js/ComposeObject';
import StoreAPI from 'StoreAPI';

class VisController extends ComposeObject {
    constructor(options = {}) {
        super(options)
        this.dataSource = new MicrophoneSource();

        this._isMounted = true;

        this.handleResize = ()=>(this._handleResize());

        window.addEventListener('resize', this.handleResize);
    }

    get type() {
        return 'controller';
    }

    get data() {
        return this.dataSource.data;
    }

    init(parentElement) {
        this.parentElement = parentElement;
        this.initThreeRenderer();
        this.initThreeScene();

        // TODO: move controls to different init with options to set the controller
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 1;
        this.controls.maxDistance = 1500;
    }

    setRendererSize() {
        this.renderer.setSize(this.parentElement.offsetWidth, this.parentElement.offsetHeight);
    }

    initThreeRenderer() {
        const renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.setRendererSize();
        renderer.setClearColor(0x000000, 0.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.autoClear = false;

        return renderer;
    }

    initThreeScene() {
        this.scene = new THREE.Scene();

        this.initCamera();
        this.initLighting();

        const gridHelper = new THREE.GridHelper( 10, 10);
        this.scene.add( gridHelper );
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

    setCameraAspectRatio() {
        const size = this.renderer.getSize();
        this.camera.aspect = size.width / size.height;
        this.camera.updateProjectionMatrix();
    }

    initCamera() {
        const size = this.renderer.getSize();

        this.camera = new THREE.PerspectiveCamera(
            45, size.width / size.height, 0.1, 15000
        );

        this.camera.position.set(0, 10, 10);
    }

    update() {
        const layers = StoreAPI.getObjectByType('layer');
        this.dataSource.update();
        const ctx = {
            data: StoreAPI.getCurrentData()
        }

        if (layers) {
            layers.forEach((o) => o.update(ctx));
        }
    }

    objectWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        this._isMounted = false;
        this.dataSource.objectWillUnmount;
    }

    _handleResize() {
        this.setRendererSize()
        this.setCameraAspectRatio();
    }

    render() {
        if (!this.state.pause && this._isMounted) {
            requestAnimationFrame(() => this.render());
        }

        if (StoreAPI.getPlaybackState().get('isPlaying')) {
            this.update();
        }

        this.controls.update();

        this.renderer.clear()
        this.renderer.render(this.scene, this.camera);
    }
}

export default VisController;
