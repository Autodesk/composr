import 'js/3rdParty/OrbitControls';
import MicrophoneSource from './dataSources/MicrophoneSource';

class VisController {
    constructor(parentElement) {
        this.renderer = this.initThreeRenderer(parentElement);
        this.initThreeScene();

        this.dataSource = new MicrophoneSource();
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 1;
        this.controls.maxDistance = 15000;

        this.state = {
            pause: false
        }
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

        // temp test scene
        const mesh = new THREE.Mesh (
            new THREE.OctahedronGeometry(3,3),
            new THREE.MeshStandardMaterial() );
        this.scene.add(mesh);
        //

    }

    initLighting() {
        const hemiLight = new THREE.HemisphereLight(0xeeeeee, 0x888888, 1);

        this.scene.add(hemiLight);
    }

    initCamera() {
        const size = this.renderer.getSize();

        this.camera = new THREE.PerspectiveCamera(
            45, size.width / size.height, 0.1, 15000
        );
    }

    render() {
        if (!this.state.pause) {
            requestAnimationFrame(() => this.render());
        }

        this.controls.update();

        this.renderer.clear()
        this.renderer.render(this.scene, this.camera);
        window.cam = this.camera;
    }
}

export default VisController;
