import 'js/3rdParty/OrbitControls';
import MicrophoneSource from './dataSources/MicrophoneSource';

import connector from 'js/connector';
import ComposeObject from 'js/ComposeObject';
import StoreAPI from 'StoreAPI';
import CameraPathControls from 'js/CameraPathControls';
import ComposeOrbitControl from 'js/CameraControls/ComposeOrbitControl';

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

    init() {
        this.initThreeRenderer();

        new ComposeOrbitControl();
        new CameraPathControls();

        this.initThreeScene();
    }

    updateCamera() {
        StoreAPI.getActiveComposeCamera().setCameraAspectRatio(this.renderer.getSize());
    }

    setRendererSize() {
        const parentElement = StoreAPI.getRenderElement();
        this.renderer.setSize(parentElement.offsetWidth, parentElement.offsetHeight);
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
        this.initLighting();

        const gridHelper = new THREE.GridHelper( 10, 10);
        this.scene.add( gridHelper );

        setTimeout(()=>this.updateCamera(), 1);
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

    update() {
        const layers = StoreAPI.getObjectByType('layer');
        const controls = StoreAPI.getObjectByType('controls');

        this.dataSource.update();
        const ctx = {
            data: StoreAPI.getCurrentData()
        }

        if (layers) {
            layers.forEach((o) => o.update(ctx));
        }

        if (controls) {
            controls.forEach((o) => o.update(ctx));
        }
    }

    objectWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        this._isMounted = false;
        this.dataSource.objectWillUnmount;
    }

    _handleResize() {
        this.setRendererSize();
        this.updateCamera();
    }

    render() {
        if (!this.state.pause && this._isMounted) {
            requestAnimationFrame(() => this.render());
        }

        if (StoreAPI.getPlaybackState().get('isPlaying')) {
            this.update();
        }

        this.renderer.clear();
        this.renderer.render(this.scene, StoreAPI.getActiveCamera());
    }
}

export default VisController;
